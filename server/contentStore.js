import mysql from "mysql2/promise";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import productSeeds from "./seeds/products.js";
import serviceSeeds from "./seeds/services.js";
import blogSeeds, { blogPageSeed } from "./seeds/blogs.js";

let pool;

function mergeMissing(defaults, current) {
  const seedVersionKey = defaults &&
    typeof defaults === "object" &&
    !Array.isArray(defaults)
    ? Object.keys(defaults).find((key) => key.endsWith("SeedVersion"))
    : undefined;
  if (
    seedVersionKey &&
    Number(defaults[seedVersionKey]) > Number(current?.[seedVersionKey] || 0)
  ) {
    return {
      ...(current && typeof current === "object" && !Array.isArray(current) ? current : {}),
      ...defaults,
    };
  }

  if (Array.isArray(defaults)) {
    if (!Array.isArray(current) || current.length === 0) {
      return defaults;
    }
    if (defaults.some((item) => item && typeof item === "object")) {
      return Array.from({ length: Math.max(defaults.length, current.length) }, (_, index) => {
        const defaultItem = defaults[index];
        const currentItem = current[index];
        if (
          defaultItem &&
          typeof defaultItem === "object" &&
          currentItem &&
          typeof currentItem === "object"
        ) {
          return mergeMissing(defaultItem, currentItem);
        }
        return currentItem === undefined ? defaultItem : currentItem;
      });
    }
    return current;
  }
  if (defaults && typeof defaults === "object") {
    const existing = current && typeof current === "object" && !Array.isArray(current)
      ? current
      : {};
    return Object.fromEntries(
      Object.entries({ ...defaults, ...existing }).map(([key, value]) => {
        const defaultValue = defaults[key];
        if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
          return [key, value];
        }
        if (!Object.prototype.hasOwnProperty.call(existing, key) || existing[key] === "") {
          return [key, defaultValue];
        }
        return [key, mergeMissing(defaultValue, existing[key])];
      }),
    );
  }
  return current === undefined || current === "" ? defaults : current;
}

export async function initializeContentStore() {
  const useLocalDefaults = process.env.NODE_ENV !== "production";
  const DB_HOST = process.env.DB_HOST || (useLocalDefaults ? "127.0.0.1" : "");
  const DB_PORT = process.env.DB_PORT || "3306";
  const DB_NAME = process.env.DB_NAME || (useLocalDefaults ? "unitedwebsite" : "");
  const DB_USER = process.env.DB_USER || (useLocalDefaults ? "root" : "");
  const DB_PASSWORD = process.env.DB_PASSWORD || "";
  if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error("MySQL is not configured. Set DB_HOST, DB_NAME, and DB_USER.");
  }

  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD || "",
    waitForConnections: true,
    connectionLimit: 10,
    charset: "utf8mb4",
  });

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_content (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(32) NOT NULL,
      slug VARCHAR(180) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content JSON NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY cms_content_type_slug (type, slug),
      INDEX cms_content_public_order (type, published, sort_order, id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_assets (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      asset_path VARCHAR(1024) NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      data LONGBLOB NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY cms_assets_path (asset_path(255))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await seedInitialAssets();
  await seedInitialContent();
  return pool;
}

const imageTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jfif", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

async function listImageFiles(directory, prefix) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const assetPath = `${prefix}/${entry.name}`.replace(/\\/g, "/");
    if (entry.isDirectory()) {
      files.push(...await listImageFiles(absolutePath, assetPath));
    } else if (entry.isFile() && imageTypes.has(path.extname(entry.name).toLowerCase())) {
      files.push({ absolutePath, assetPath });
    }
  }
  return files;
}

async function seedInitialAssets() {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const files = [
    ...await listImageFiles(path.join(projectRoot, "public"), "public"),
    ...await listImageFiles(path.join(projectRoot, "src", "assets"), "src/assets"),
  ];

  for (const file of files) {
    const mimeType = imageTypes.get(path.extname(file.absolutePath).toLowerCase());
    const data = await readFile(file.absolutePath);
    await pool.execute(
      `INSERT IGNORE INTO cms_assets (asset_path, mime_type, data)
       VALUES (?, ?, ?)`,
      [file.assetPath, mimeType, data],
    );
  }
}

export async function getContentAsset(assetPath) {
  const [rows] = await getContentPool().execute(
    "SELECT mime_type, data FROM cms_assets WHERE asset_path = ? LIMIT 1",
    [assetPath],
  );
  return rows[0] || null;
}

export async function saveContentAsset(assetPath, mimeType, data) {
  await getContentPool().execute(
    `INSERT INTO cms_assets (asset_path, mime_type, data) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE mime_type = VALUES(mime_type), data = VALUES(data)`,
    [assetPath, mimeType, data],
  );
}

async function seedInitialContent() {
  const initialContent = [
    ...productSeeds,
    ...serviceSeeds,
    blogPageSeed,
    {
      type: "page",
      slug: "home",
      title: "Home page",
      content: {
        eyebrow: "DIGITAL PRODUCTS • AI • SCALE",
        headingPrefix: "Building",
        headingHighlight: "Businesses",
        headingSuffix: "Beyond Code",
        description:
          "We design products, automate systems, and build digital experiences helping ambitious companies scale faster.",
        backgroundImage: "/images/home/hero-dashboard.webp",
        ctaText: "Start Project →",
        ctaHref: "/contact",
        stats: [
          { value: "180+", label: "Projects" },
          { value: "40+", label: "Clients" },
          { value: "12", label: "Countries" },
          { value: "1.2M", label: "Monthly Users" },
          { value: "100%", label: "Delivery Rate" },
        ],
        sections: {
          businessSolutions: {
            eyebrow: "OUR EXPERTISE",
            heading: "Technology Meets Growth",
            description:
              "We build scalable digital ecosystems combining engineering and marketing power.",
            developmentEyebrow: "Development Core",
            developmentHeading: "Engineering Solutions",
            developmentServices: [
              { title: "Web Application Development" },
              { title: "Mobile Application Development" },
              { title: "AI Application Development" },
              { title: "Custom Software Development" },
              { title: "Zoho Support & Integration" },
              { title: "CRM Development" },
              { title: "Cloud Solutions" },
            ],
            marketingEyebrow: "Growth Engine",
            marketingHeading: "Marketing Solutions",
            marketingServices: [
              { title: "Digital Marketing" },
              { title: "SEO Optimization", href: "/seo-optimization" },
              { title: "Google Ads / Google Ads" },
              { title: "Social Media Marketing" },
              { title: "AI Content Creation" },
              { title: "Performance Marketing" },
              { title: "Branding & Lead Generation" },
            ],
          },
          aiDigital: {
            eyebrow: "AI • DIGITAL • AUTOMATION",
            heading: "AI-Powered Growth Solutions",
            description:
              "Powerful AI automation and digital growth solutions crafted for modern businesses.",
            aiEyebrow: "AI & Automation",
            aiHeading: "Intelligent Business Systems",
            aiServices: [
              { title: "AI Chatbots" },
              { title: "AI Content Generation" },
              { title: "Workflow Automation" },
              { title: "AI Customer Support" },
              { title: "Business Intelligence" },
            ],
            digitalEyebrow: "Digital Growth",
            digitalHeading: "Marketing & Brand Expansion",
            digitalServices: [
              { title: "SEO Services", href: "/seo-optimization" },
              { title: "Google Ads" },
              { title: "Meta Ads" },
              { title: "Content Marketing" },
              { title: "Social Media Campaigns" },
            ],
          },
          testimonials: {
            eyebrow: "Trusted Partners",
            heading: "Trusted by Businesses Worldwide",
            logos: [
              { src: "/images/home/logo1.webp", alt: "Client logo 1" },
              { src: "/images/home/logo2.webp", alt: "Client logo 2" },
              { src: "/images/home/logo3.webp", alt: "Client logo 3" },
              { src: "/images/home/logo4.webp", alt: "Client logo 4" },
              { src: "/images/home/logo5.webp", alt: "Client logo 5" },
              { src: "/images/home/logo6.webp", alt: "Client logo 6" },
            ],
          },
          services: {
            eyebrow: "Services",
            heading: "Our Services",
          },
          testimonialCarousel: {
            eyebrow: "Testimonials",
            heading: "What Our Clients Say",
            description:
              "Discover how our web development solutions help businesses establish a strong digital presence and achieve measurable growth.",
          },
          whyChooseUs: {
            eyebrow: "Why Choose Us",
            heading: "Innovation. Agility. Growth.",
            description: "Delivering smart solutions that drive business success.",
            reasons: [
              {
                title: "Customer's View",
                description:
                  "We combine your vision with our expertise to deliver solutions that truly stand out.",
              },
              {
                title: "Agile Methodology",
                description:
                  "Leveraging agile practices to deliver continuous improvement and quality.",
              },
              {
                title: "Continuous Improvement",
                description:
                  "Continuously improving processes, products, and services to deliver the best results.",
              },
              {
                title: "Operational Excellence",
                description:
                  "Combining leadership and problem-solving to deliver innovative solutions.",
              },
            ],
          },
          counters: {
            stats: [
              { value: "100+", label: "Happy Clients" },
              { value: "200+", label: "Finished Projects" },
              { value: "50+", label: "Skilled Experts" },
              { value: "500+", label: "Media Posts" },
            ],
          },
          blogs: {
            eyebrow: "Latest Blogs",
            heading: "Insights & Articles",
            description:
              "Explore the latest trends in AI, cybersecurity, cloud computing, automation and digital transformation.",
            readMoreLabel: "Read More",
          },
          footer: {
            description:
              "Technology solutions designed to help businesses build, automate, and grow.",
            servicesHeading: "Services",
            links: [
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Blogs", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ],
            socialLinks: [
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
              { label: "LinkedIn", href: "#" },
            ],
            contactHeading: "Contact Info",
            email: "info@unitdtechnologies.com",
            copyrightPrefix: "Copyright ©",
            copyright: "United Technologies",
            termsLabel: "Terms of Service",
            termsHref: "/terms-of-service",
            privacyLabel: "Privacy Policy",
            privacyHref: "/privacy-policy",
          },
          brand: {
            logo: "/images/home/logo-dark.svg",
            logoAlt: "United Technologies Logo",
            menuToggleLabel: "Toggle navigation",
          },
        },
      },
    },
    {
      type: "service",
      slug: "mobile-app-development",
      title: "Mobile App Development",
      content: { description: "Android, iOS, Hybrid", icon: "Smartphone" },
    },
    {
      type: "service",
      slug: "web-e-commerce-development",
      title: "Web / E-Commerce Development",
      content: {
        description: "Shopify, WordPress, Magento, Joomla, Big Commerce",
        icon: "Globe",
      },
    },
    {
      type: "service",
      slug: "digital-marketing",
      title: "Digital Marketing",
      content: {
        description: "SEO, SEM, SMO, PPC, Content Marketing",
        icon: "Megaphone",
      },
    },
    {
      type: "service",
      slug: "cloud-hosting",
      title: "Cloud Hosting",
      content: {
        description: "Cloud Server, Email Server, VPS, Dedicated Server, GSuite",
        icon: "Cloud",
      },
    },
    {
      type: "testimonial",
      slug: "michael-carter",
      title: "Michael Carter",
      content: {
        company: "Creative Studios",
        rating: 5,
        review:
          "The team delivered a modern, responsive website that perfectly represents our brand.",
        image: "/images/home/testimonial1.webp",
        placement: "trusted-partners",
      },
    },
    {
      type: "testimonial",
      slug: "sarah-johnson",
      title: "Sarah Johnson",
      content: {
        company: "Vision Media",
        rating: 5,
        review: "They transformed our ideas into a stunning and functional website.",
        image: "/images/home/testimonial2.webp",
        placement: "trusted-partners",
      },
    },
    {
      type: "testimonial",
      slug: "david-wilson",
      title: "David Wilson",
      content: {
        company: "Pixel Works",
        rating: 5,
        review: "Professional work and excellent delivery. Highly recommended.",
        image: "/images/home/testimonial3.webp",
        placement: "trusted-partners",
      },
    },
    {
      type: "testimonial",
      slug: "michael-carter-carousel",
      title: "Michael Carter",
      content: {
        company: "TechSphere Solutions",
        rating: 5,
        review:
          "The team delivered a modern, responsive website that perfectly represents our brand. Their attention to detail, technical expertise, and commitment to quality exceeded our expectations.",
        image: "/images/home/testimonial1.webp",
        placement: "carousel",
      },
    },
    {
      type: "testimonial",
      slug: "sarah-johnson-carousel",
      title: "Sarah Johnson",
      content: {
        company: "Vision Digital Agency",
        rating: 5,
        review:
          "Working with this team was seamless from start to finish. They transformed our ideas into a visually stunning and highly functional website that has significantly improved our online presence.",
        image: "/images/home/testimonial2.webp",
        placement: "carousel",
      },
    },
    {
      type: "testimonial",
      slug: "david-wilson-carousel",
      title: "David Wilson",
      content: {
        company: "Global Business Systems",
        rating: 5,
        review:
          "Their professionalism and web development expertise helped us launch a fast, user-friendly website that our customers love. We couldn't be happier with the results.",
        image: "/images/home/testimonial3.webp",
        placement: "carousel",
      },
    },
    {
      type: "blog",
      slug: "quantum-computing",
      title: "The Quantum Computing Revolution",
      content: {
        category: "Technology",
        date: "12 May 2026",
        description:
          "Discover how quantum computing is transforming industries with next-generation processing power.",
        image: "/images/home/technology1.webp",
      },
    },
    {
      type: "blog",
      slug: "ai-2030",
      title: "Artificial Intelligence in 2030",
      content: {
        category: "Artificial Intelligence",
        date: "18 May 2026",
        description:
          "Explore the future of AI and how it will reshape businesses, healthcare and automation.",
        image: "/images/home/technology2.webp",
      },
    },
    {
      type: "blog",
      slug: "ransomware-protection",
      title: "The Rise of Ransomware: How Businesses Can Protect Themselves",
      content: {
        category: "Cyber Security",
        date: "22 May 2026",
        description:
          "Learn the best cybersecurity strategies businesses can use to prevent ransomware attacks.",
        image: "/images/home/technology3.webp",
      },
    },
    {
      type: "blog",
      slug: "cybersecurity-development",
      title: "Enhancing Cybersecurity in Software Development",
      content: {
        category: "Software Development",
        date: "28 May 2026",
        description:
          "Modern development practices now require advanced security integration from day one.",
        image: "/images/home/technology4.webp",
      },
    },
    {
      type: "blog",
      slug: "cloud-computing",
      title: "Cloud Computing and Its Impact on Software Development",
      content: {
        category: "Cloud Computing",
        date: "02 June 2026",
        description:
          "Cloud technologies continue to redefine scalability, deployment and software innovation.",
        image: "/images/home/technology5.webp",
      },
    },
    {
      type: "blog",
      slug: "ai-healthcare",
      title: "AI in Healthcare: Transforming the Medical Landscape",
      content: {
        category: "Healthcare",
        date: "06 June 2026",
        description:
          "AI-driven healthcare systems are improving diagnostics, patient care and medical efficiency.",
        image: "/images/home/technology6.webp",
      },
    },
    ...blogSeeds,
    {
      type: "navigation",
      slug: "main",
      title: "Main navigation",
      content: {
        links: [
          { label: "Home", href: "/", type: "route" },
          { label: "About Us", href: "/about", type: "route" },
          { label: "Products", href: "/products", type: "route" },
          {
            label: "Services",
            href: "#services",
            type: "anchor",
            dropdown: [
              {
                label: "Digital Marketing",
                href: "/seo-optimization",
                children: [
                  { label: "Search Engine Marketing", href: "/search-engine-marketing" },
                  { label: "Social Media Marketing", href: "/social-media-marketing" },
                  { label: "Search Engine Optimization", href: "/seo-optimization" },
                ],
              },
              { label: "Website Development", href: "/website-development" },
              { label: "Mobile App Development", href: "/mobileapp-development" },
              { label: "Cloud Hosting", href: "/cloud-hosting" },
            ],
          },
          { label: "Blogs", href: "/blog", type: "route" },
          { label: "Contact Us", href: "/contact", type: "route" },
        ],
      },
    },
  ];

  const pageRecords = [
    [
      "about",
      "About Us",
      {
        heroEyebrow: "ABOUT • OUR MISSION • OUR PRODUCTS",
        heroTitlePrefix: "Build your business",
        heroTitleHighlight: "together with",
        heroTitleSuffix: "United Technologies.",
        heroDescription:
          "United Technologies (UT), a passionate team of IT enthusiasts founded in 2002. Our journey began with a pilot project from Hong Kong, handling simple websites and online applications. As we grew, our expertise expanded, and we quickly ventured into diverse projects across various domains. For over two decades, we have proudly served as the offshore service provider for Pilot Simple Software, Hong Kong, forging a strong partnership.\n\nWe take immense pride in being the co-partner of 'Edukite,' an innovative Elearning Tool that has made its mark in Australian schools. Our role encompasses design, development, and back-end support for this product, which is now successfully implemented in numerous schools across Australia.",
        heroImage: "/images/about-hero.webp",
        heroImageAlt: "About Hero",
        howWeWorkLabel: "How We Work →",
        howWeWorkHref: "#how-we-work",
        exploreProductsLabel: "Explore Products",
        exploreProductsHref: "#exclusive-products",
        stats: [
          { value: "40+", label: "Happy Clients" },
          { value: "180+", label: "Finished Projects" },
          { value: "100+", label: "Skilled Experts" },
          { value: "7", label: "Exclusive Products" },
        ],
        companyEyebrow: "ABOUT COMPANY",
        companyHeadingPrefix: "A passionate team,",
        companyHeadingMiddle: "two decades of",
        companyHeadingHighlight: "global growth.",
        companyDescription:
          "United Technologies (UT) is a passionate team of IT enthusiasts founded in 2002 — from a pilot project in Hong Kong to a global presence across Asia and the Middle East.",
        timeline: [
          {
            title: "Our Beginning",
            description:
              "United Technologies (UT), a passionate team of IT enthusiasts founded in 2002. Our journey began with a pilot project from Hong Kong, handling simple websites and online applications, and for over two decades we've served as the offshore service provider for Pilot Simple Software, Hong Kong.",
            icon: "⌕",
          },
          {
            title: "Elearning Partnership",
            description:
              "We take immense pride in being the co-partner of 'Edukite,' an innovative Elearning Tool that has made its mark in Australian schools. Our role encompasses design, development, and back-end support, now implemented in numerous schools across Australia.",
            icon: "⚙",
          },
          {
            title: "Global Growth",
            description:
              "At our core, we believe that simplicity should never equate to dullness. Our passion lies in crafting intuitive designs that are accessible to everyone. Our journey began in Singapore, where a team of experts from management and technology fields converged. Over time, we have expanded our presence globally through representation, outsourcing, and strategic partnerships, always striving to add value.",
            icon: "⎇",
          },
          {
            title: "Regional Presence",
            description:
              "Our teams in Singapore and Hong Kong cater to the Far East Asia and Greater China regions, while our presence in Dubai, Egypt, and Saudi Arabia focuses on the Middle East and North Africa regions.",
            icon: "↗",
          },
        ],
        principlesEyebrow: "MISSION & VISION",
        principlesHeadingPrefix: "What drives us",
        principlesHeadingHighlight: "forward.",
        principles: [
          {
            title: "Strategic Alliances",
            description:
              "Determined to make a positive impact, we have ventured into various global regions by pursuing new business opportunities and forming strategic alliances with valuable partners, fostering a win-win model.",
          },
          {
            title: "Industry Focus",
            description:
              "For the past half-decade, our focus and passion have been dedicated to building online products in the Education, Medical, and Service industries. Today, we take immense pride in serving a diverse clientele from various industries, continuously growing and innovating along the way.",
          },
          {
            title: "Our Mission",
            description:
              "Our mission is to flourish worldwide by implementing solutions that enhance productivity, improve efficiency, and minimize manual work. We are dedicated to making a positive impact on businesses across the globe, enabling them to thrive and succeed in an ever-evolving landscape.",
          },
          {
            title: "Our Vision",
            description:
              "Our goal is to develop a range of online products tailored for growing industries, aimed at reducing workload, delivering efficient results, and maximizing revenue margins to unprecedented heights. We are committed to empowering businesses with cutting-edge solutions that drive growth and success in today's competitive market.",
          },
        ],
        productsEyebrow: "EXCLUSIVE PRODUCTS",
        productsHeadingPrefix: "A product for every",
        productsHeadingHighlight: "business workflow.",
        productsDescription:
          "7 exclusive products engineered for manufacturers, traders, schools, construction firms and service businesses.",
        products: [
          {
            title: "Inventory / Trading",
            tag: "UTS TMS",
            description:
              "Seamless automation, decision-making assessment tools and live stock updates tied to sales for trading companies.",
            icon: "📦",
          },
          {
            title: "CRM Suite",
            tag: "UTS CRM",
            description:
              "Decision-making tools and smart alerts for overdue payments — purpose-built for auditors and book-keepers.",
            icon: "👜",
          },
          {
            title: "Project Management",
            tag: "UTS PMS",
            description:
              "Intuitive dashboards, real-time collaboration and budget/expense management for distributed remote teams.",
            icon: "🧩",
          },
          {
            title: "Payroll",
            tag: "UTS PAYROLL",
            description:
              "Auto-generated documents, seamless employee management and automatic CPF deduction for large headcounts.",
            icon: "💳",
          },
          {
            title: "School Management Software",
            tag: "UTS SMS",
            description:
              "Smart invoice tracking and online assessments mapped to courses — tailored for tuition centers and edutrust schools.",
            icon: "🎓",
          },
          {
            title: "Enterprise Resource Planning",
            tag: "UTS ERP",
            description:
              "Inventory, financials, HR & CRM with workflow automation plus reporting & analytics — for manufacturers and service businesses.",
            icon: "🏗️",
          },
          {
            title: "Smart Construction Software",
            tag: "UTS SCMS",
            description:
              "Automated process flows and multi-option quote management for construction firms, suppliers and sub-contractors.",
            icon: "⚡",
          },
        ],
        servicesEyebrow: "OUR SERVICES",
        servicesHeadingPrefix: "Full-stack delivery",
        servicesHeadingHighlight: "end to end.",
        servicesDescription:
          "Beyond our exclusive products, we deliver mobile, web, marketing and cloud services.",
        servicesImage: "/images/world-map.webp",
        servicesImageAlt: "World map showing the regions we serve",
        services: [
          {
            title: "Mobile App Development",
            description: "Android, iOS and Hybrid apps engineered for performance and scale.",
          },
          {
            title: "Web / E-Commerce Development",
            description: "Shopify, WordPress, Magento and custom platforms.",
          },
          {
            title: "Digital Marketing",
            description: "SEO, SEM, PPC and content marketing solutions.",
          },
          {
            title: "Cloud Hosting",
            description: "Cloud servers, VPS, dedicated hosting and Google Workspace.",
          },
        ],
        ctaEyebrow: "GET IN TOUCH",
        ctaHeadingPrefix: "Ready to build",
        ctaHeadingHighlight: "your business?",
        ctaDescription:
          "Get in touch with us today to explore possibilities. We help businesses scale through innovation.",
        ctaButtonLabel: "Enquire Now →",
        ctaButtonHref: "/contact",
      },
    ],
    ["products", "Products"],
    ["project-management", "Project Management"],
    ["school-management", "School Management"],
    ["smart-construction-crm-software", "Smart Construction CRM Software"],
    ["enterprise-resource-planning", "Enterprise Resource Planning"],
    ["payroll-management", "Payroll Management"],
    ["customer-relationship-management", "Customer Relationship Management"],
    ["trading-management", "Trading Management"],
    ["blog", "Blog"],
    ["seo-optimization", "Search Engine Optimization"],
    ["search-engine-marketing", "Search Engine Marketing"],
    ["social-media-marketing", "Social Media Marketing"],
    ["cloud-hosting", "Cloud Hosting"],
    ["website-development", "Website Development"],
    ["mobileapp-development", "Mobile App Development"],
    ["contact", "Contact Us"],
    ["enquiry", "Enquiry"],
    ["enquiryNow", "Enquiry"],
    ["privacy-policy", "Privacy Policy"],
    ["terms-of-service", "Terms of Service"],
  ];

  for (const [slug, title, pageContent] of pageRecords) {
    initialContent.push({
      type: "page",
      slug,
      title,
      content: pageContent || { pageTitle: title },
    });
  }

  for (const item of initialContent) {
    await pool.execute(
      `INSERT IGNORE INTO cms_content (type, slug, title, content, sort_order, published)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      [
        item.type,
        item.slug,
        item.title,
        JSON.stringify(item.content),
        initialContent.indexOf(item),
      ],
    );

    const [rows] = await pool.execute(
      "SELECT content FROM cms_content WHERE type = ? AND slug = ? LIMIT 1",
      [item.type, item.slug],
    );
    const storedContent = rows[0]?.content;
    if (storedContent) {
      let currentContent =
        typeof storedContent === "string" ? JSON.parse(storedContent) : storedContent;
      if (
        item.type === "navigation" &&
        Array.isArray(item.content.links) &&
        Array.isArray(currentContent.links)
      ) {
        currentContent = {
          ...currentContent,
          links: currentContent.links.map((link) => {
            if (!link || typeof link !== "object") return link;
            const defaultLink = item.content.links.find(
              (candidate) => candidate.label === link.label,
            );
            return defaultLink ? mergeMissing(defaultLink, link) : link;
          }),
        };
      }
      const mergedContent = mergeMissing(item.content, currentContent);
      if (JSON.stringify(mergedContent) !== JSON.stringify(currentContent)) {
        await pool.execute(
          "UPDATE cms_content SET content = ? WHERE type = ? AND slug = ?",
          [JSON.stringify(mergedContent), item.type, item.slug],
        );
      }
    }
  }
}

export function getContentPool() {
  if (!pool) {
    throw new Error("The content database is not available.");
  }
  return pool;
}

export async function closeContentStore() {
  if (pool) await pool.end();
}
