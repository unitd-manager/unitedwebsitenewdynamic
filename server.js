import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { buildMailOptions } from "./src/lib/enquiryMail.js";
import {
  closeContentStore,
  getContentPool,
  getContentAsset,
  initializeContentStore,
  saveContentAsset,
} from "./server/contentStore.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

let cmsDatabaseReady = false;
const adminSessions = new Map();
const loginAttempts = new Map();
const sessionLifetimeMs = 8 * 60 * 60 * 1000;
const contentTypes = new Set([
  "page",
  "navigation",
  "product",
  "service",
  "blog",
  "testimonial",
]);
const uploadMimeTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const uploadExtensions = new Map([
  ["image/avif", "avif"],
  ["image/gif", "gif"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function getSessionToken(req) {
  const cookies = req.headers.cookie || "";
  const sessionCookie = cookies
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("cms_session="));
  return sessionCookie?.slice("cms_session=".length);
}

function isAuthenticated(req) {
  const token = getSessionToken(req);
  const expiresAt = token && adminSessions.get(token);
  if (!expiresAt) return false;
  if (expiresAt <= Date.now()) {
    adminSessions.delete(token);
    return false;
  }
  adminSessions.set(token, Date.now() + sessionLifetimeMs);
  return true;
}

function requireCmsDatabase(_req, res, next) {
  if (!cmsDatabaseReady) {
    return res.status(503).json({ message: "The content database is unavailable." });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ message: "Admin sign-in is required." });
  }
  next();
}

function validContentItem(item) {
  return (
    item &&
    typeof item === "object" &&
    contentTypes.has(item.type) &&
    typeof item.slug === "string" &&
    /^[a-z0-9][a-z0-9_-]{0,179}$/i.test(item.slug) &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    item.title.length <= 255 &&
    item.content &&
    typeof item.content === "object" &&
    !Array.isArray(item.content) &&
    (item.id === undefined || (Number.isInteger(Number(item.id)) && Number(item.id) > 0)) &&
    Number.isInteger(Number(item.sort_order)) &&
    typeof item.published === "boolean"
  );
}

function parseDatabaseItem(row) {
  return {
    ...row,
    content: typeof row.content === "string" ? JSON.parse(row.content) : row.content,
    published: Boolean(row.published),
  };
}

app.get("/api/media", requireCmsDatabase, async (req, res) => {
  const assetPath = req.query.path;
  if (
    typeof assetPath !== "string" ||
    assetPath.length > 1024 ||
    assetPath.includes("..") ||
    assetPath.includes("\\")
  ) {
    return res.status(400).json({ message: "A valid media path is required." });
  }

  try {
    const asset = await getContentAsset(assetPath);
    if (!asset) return res.status(404).json({ message: "Image was not found." });
    res.set({
      "Content-Type": asset.mime_type,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    res.send(asset.data);
  } catch (error) {
    console.error("[CMS] Failed to load image:", error.message);
    res.status(500).json({ message: "Failed to load image." });
  }
});

app.get(/^\/images\/(.+)$/, requireCmsDatabase, async (req, res) => {
  const assetPath = `public/images/${req.params[0]}`;
  try {
    const asset = await getContentAsset(assetPath);
    if (!asset) return res.status(404).json({ message: "Image was not found." });
    res.set({
      "Content-Type": asset.mime_type,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    res.send(asset.data);
  } catch (error) {
    console.error("[CMS] Failed to load public image:", error.message);
    res.status(500).json({ message: "Failed to load image." });
  }
});

app.post(
  "/api/admin/media",
  requireCmsDatabase,
  requireAdmin,
  express.raw({ type: [...uploadMimeTypes], limit: "15mb" }),
  async (req, res) => {
    const mimeType = req.get("Content-Type")?.split(";")[0].trim().toLowerCase();
    if (!uploadMimeTypes.has(mimeType) || !Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Upload a non-empty supported image file." });
    }

    const assetPath = `uploads/${randomUUID()}.${uploadExtensions.get(mimeType)}`;
    try {
      await saveContentAsset(assetPath, mimeType, req.body);
      res.status(201).json({
        url: `/api/media?path=${encodeURIComponent(assetPath)}`,
      });
    } catch (error) {
      console.error("[CMS] Failed to save uploaded image:", error.message);
      res.status(500).json({ message: "Failed to save image." });
    }
  },
);

app.get("/api/content", requireCmsDatabase, async (req, res) => {
  const { type } = req.query;
  if (typeof type !== "string" || !contentTypes.has(type)) {
    return res.status(400).json({ message: "A valid content type is required." });
  }

  try {
    const [rows] = await getContentPool().execute(
      `SELECT id, type, slug, title, content, sort_order, published, updated_at
       FROM cms_content WHERE type = ? AND published = TRUE ORDER BY sort_order, id`,
      [type],
    );
    res.json(rows.map(parseDatabaseItem));
  } catch (error) {
    console.error("[CMS] Failed to load public content:", error.message);
    res.status(500).json({ message: "Failed to load website content." });
  }
});

app.get("/api/content/:type/:slug", requireCmsDatabase, async (req, res) => {
  const { type, slug } = req.params;
  if (!contentTypes.has(type)) {
    return res.status(400).json({ message: "A valid content type is required." });
  }

  try {
    const [rows] = await getContentPool().execute(
      `SELECT id, type, slug, title, content, sort_order, published, updated_at
       FROM cms_content WHERE type = ? AND slug = ? AND published = TRUE LIMIT 1`,
      [type, slug],
    );
    res.json(rows.length ? parseDatabaseItem(rows[0]) : null);
  } catch (error) {
    console.error("[CMS] Failed to load public content item:", error.message);
    res.status(500).json({ message: "Failed to load website content." });
  }
});

app.get("/api/admin/session", (_req, res) => {
  res.json({ authenticated: isAuthenticated(_req) });
});

app.post("/api/admin/login", requireCmsDatabase, async (req, res) => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    return res.status(503).json({ message: "Admin credentials are not configured." });
  }

  const address = req.ip || req.socket.remoteAddress || "unknown";
  const attempts = loginAttempts.get(address) || { count: 0, expiresAt: Date.now() + 15 * 60 * 1000 };
  if (attempts.expiresAt <= Date.now()) {
    attempts.count = 0;
    attempts.expiresAt = Date.now() + 15 * 60 * 1000;
  }
  if (attempts.count >= 10) {
    loginAttempts.set(address, attempts);
    return res.status(429).json({ message: "Too many sign-in attempts. Try again later." });
  }

  const suppliedUsername = Buffer.from(String(req.body?.username || ""));
  const suppliedPassword = Buffer.from(String(req.body?.password || ""));
  const expectedUsername = Buffer.from(username);
  const expectedPassword = Buffer.from(password);
  const usernameMatches =
    suppliedUsername.length === expectedUsername.length &&
    timingSafeEqual(suppliedUsername, expectedUsername);
  const passwordMatches =
    suppliedPassword.length === expectedPassword.length &&
    timingSafeEqual(suppliedPassword, expectedPassword);

  if (!usernameMatches || !passwordMatches) {
    attempts.count += 1;
    loginAttempts.set(address, attempts);
    return res.status(401).json({ message: "Invalid username or password." });
  }

  loginAttempts.delete(address);
  const token = randomBytes(32).toString("hex");
  adminSessions.set(token, Date.now() + sessionLifetimeMs);
  res.cookie("cms_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionLifetimeMs,
    path: "/api",
  });
  res.json({ authenticated: true });
});

app.post("/api/admin/logout", (req, res) => {
  const token = getSessionToken(req);
  if (token) adminSessions.delete(token);
  res.clearCookie("cms_session", { httpOnly: true, sameSite: "strict", path: "/api" });
  res.json({ authenticated: false });
});

app.get("/api/admin/content", requireCmsDatabase, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await getContentPool().execute(
      `SELECT id, type, slug, title, content, sort_order, published, updated_at
       FROM cms_content ORDER BY type, sort_order, id`,
    );
    res.json(rows.map(parseDatabaseItem));
  } catch (error) {
    console.error("[CMS] Failed to load admin content:", error.message);
    res.status(500).json({ message: "Failed to load content." });
  }
});

app.put("/api/admin/content", requireCmsDatabase, requireAdmin, async (req, res) => {
  const item = req.body;
  if (!validContentItem(item)) {
    return res.status(400).json({ message: "The content item is invalid." });
  }

  try {
    let itemId = Number(item.id) || 0;
    const values = [
        item.type,
        item.slug,
        item.title.trim(),
        JSON.stringify(item.content),
        Number(item.sort_order),
        item.published,
      ];
    if (item.id) {
      const [existing] = await getContentPool().execute(
        "SELECT id FROM cms_content WHERE id = ? LIMIT 1",
        [Number(item.id)],
      );
      if (!existing.length) {
        return res.status(404).json({ message: "Content was not found." });
      }
      await getContentPool().execute(
        `UPDATE cms_content SET type = ?, slug = ?, title = ?, content = ?,
          sort_order = ?, published = ? WHERE id = ?`,
        [...values, Number(item.id)],
      );
    } else {
      const [result] = await getContentPool().execute(
        `INSERT INTO cms_content (type, slug, title, content, sort_order, published)
         VALUES (?, ?, ?, ?, ?, ?)`,
        values,
      );
      itemId = result.insertId;
    }
    const [rows] = await getContentPool().execute(
      `SELECT id, type, slug, title, content, sort_order, published, updated_at
       FROM cms_content WHERE id = ? LIMIT 1`,
      [itemId],
    );
    res.json(parseDatabaseItem(rows[0]));
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "That slug is already used for this content type." });
    }
    console.error("[CMS] Failed to save content:", error.message);
    res.status(500).json({ message: "Failed to save content." });
  }
});

app.delete("/api/admin/content/:id", requireCmsDatabase, requireAdmin, async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({ message: "A valid content ID is required." });
  }
  try {
    const [result] = await getContentPool().execute(
      "DELETE FROM cms_content WHERE id = ?",
      [req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Content was not found." });
    }
    res.json({ deleted: true });
  } catch (error) {
    console.error("[CMS] Failed to delete content:", error.message);
    res.status(500).json({ message: "Failed to delete content." });
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: false,
  debug: false,
});

// Test SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("[SMTP] Connection verification failed:", error.message);
    console.error("[SMTP] Error details:", {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
    });
  } else {
    console.log("[SMTP] ✓ Connection verified - SMTP server is ready");
  }
});

app.post("/api/enquiry", async (req, res) => {
  console.log("[POST /api/enquiry] Received enquiry:", req.body);
  const { name, company, email, phone, product, details } = req.body || {};

  if (!name || !company || !email || !phone) {
    console.log("[POST /api/enquiry] Validation failed - missing fields");
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const mailOptions = buildMailOptions(
      { name, company, email, phone, product, details },
      process.env.CONTACT_RECEIVER_EMAIL || "ponmalar6596@gmail.com"
    );

    console.log("[POST /api/enquiry] Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      replyTo: mailOptions.replyTo,
      subject: mailOptions.subject,
    });

    // Send email to business
    const info = await transporter.sendMail(mailOptions);

    console.log("[POST /api/enquiry] ✓ Business email sent! SMTP Response:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.SMTP_FROM || "notification@unitdtechnologies.com",
      to: email,
      replyTo: process.env.SMTP_REPLY_TO || "notification@unitdtechnologies.com",
      subject: "Enquiry Confirmation - United Technologies",
      text: `Dear ${name},\n\nThank you for submitting your enquiry. We have received your request and will get back to you shortly.\n\nEnquiry Details:\n- Company: ${company}\n- Product/Service: ${product || "Not specified"}\n\nBest regards,\nUnited Technologies Team`,
      html: `<h3>Thank you for your enquiry!</h3><p>Dear ${name},</p><p>We have received your enquiry and will contact you shortly.</p><p><strong>Enquiry Details:</strong></p><ul><li><strong>Company:</strong> ${company}</li><li><strong>Product/Service:</strong> ${product || "Not specified"}</li></ul><p>Best regards,<br/>United Technologies Team</p>`,
    };

    await transporter.sendMail(confirmationOptions);
    console.log("[POST /api/enquiry] ✓ Confirmation email sent to user:", email);

    res.status(200).json({
      message: "Enquiry sent successfully. Check your email for confirmation.",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("[POST /api/enquiry] SMTP Error Details:", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      errno: error?.errno,
      syscall: error?.syscall,
      hostname: error?.hostname,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
    });
    res.status(500).json({
      message: "Failed to send enquiry email.",
      details: error?.message || "Unknown SMTP error",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  console.log("[POST /api/contact] Received contact message:", req.body);
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    console.log("[POST /api/contact] Validation failed - missing fields");
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    // Send email to business
    const businessMailOptions = {
      from: process.env.SMTP_FROM || "notification@unitdtechnologies.com",
      to: process.env.CONTACT_RECEIVER_EMAIL || "utsappcreate@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<h2>New Contact Message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "Not provided"}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
    };

    console.log("[POST /api/contact] Mail options:", {
      from: businessMailOptions.from,
      to: businessMailOptions.to,
      replyTo: businessMailOptions.replyTo,
      subject: businessMailOptions.subject,
    });

    const info = await transporter.sendMail(businessMailOptions);

    console.log("[POST /api/contact] ✓ Business email sent! SMTP Response:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.SMTP_FROM || "notification@unitdtechnologies.com",
      to: email,
      replyTo: process.env.SMTP_REPLY_TO || "notification@unitdtechnologies.com",
      subject: "Message Received - United Technologies",
      text: `Dear ${name},\n\nThank you for contacting us. We have received your message and will get back to you as soon as possible.\n\nSubject: ${subject}\n\nBest regards,\nUnited Technologies Team`,
      html: `<h3>Thank you for contacting us!</h3><p>Dear ${name},</p><p>We have received your message and will get back to you as soon as possible.</p><p><strong>Subject:</strong> ${subject}</p><p>Best regards,<br/>United Technologies Team</p>`,
    };

    await transporter.sendMail(confirmationOptions);
    console.log("[POST /api/contact] ✓ Confirmation email sent to user:", email);

    res.status(200).json({
      message: "Message sent successfully.",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("[POST /api/contact] SMTP Error Details:", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      errno: error?.errno,
      syscall: error?.syscall,
      hostname: error?.hostname,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
    });
    res.status(500).json({
      message: "Failed to send message.",
      details: error?.message || "Unknown SMTP error",
    });
  }
});

app.get("/health", (_req, res) => {
  res.status(cmsDatabaseReady ? 200 : 503).json({
    ok: true,
    cmsDatabaseReady,
  });
});

async function startServer() {
  try {
    await initializeContentStore();
    cmsDatabaseReady = true;
    console.log("[CMS] MySQL content database is ready.");
  } catch (error) {
    console.error("[CMS] MySQL content database is unavailable:", error.message);
  }

  const server = app.listen(port, () => {
    console.log(`SMTP and content API running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error("Server error:", err.message);
    }
    process.exit(1);
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, async () => {
      server.close();
      await closeContentStore();
      process.exit(0);
    });
  }
}

startServer();
