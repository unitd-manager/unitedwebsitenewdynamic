export const buildEnquiryEmailBody = (form) => {
  const lines = [
    "New Enquiry Submitted",
    "====================",
    "",
    `Name: ${form.name}`,
    `Company: ${form.company}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Product / Service: ${form.product || "Not specified"}`,
    "",
    "Enquiry Details:",
    form.details || "No details provided.",
    "",
    "Submitted from: unitdtechnologies.com enquiry form",
  ];

  return lines.join("\n");
};

export const buildMailOptions = (form, receiverEmail, senderEmail = "notification@unitdtechnologies.com") => ({
  from: senderEmail,
  to: receiverEmail,
  replyTo: senderEmail,
  subject: `New Enquiry Submitted - ${form.company || form.name}`,
  text: buildEnquiryEmailBody(form),
  html: `<h2>New Enquiry Submitted</h2><p><strong>Name:</strong> ${form.name}</p><p><strong>Company:</strong> ${form.company}</p><p><strong>Email:</strong> ${form.email}</p><p><strong>Phone:</strong> ${form.phone}</p><p><strong>Product / Service:</strong> ${form.product || "Not specified"}</p><p><strong>Enquiry Details:</strong></p><p>${(form.details || "No details provided.").replace(/\n/g, "<br />")}</p>`,
});
