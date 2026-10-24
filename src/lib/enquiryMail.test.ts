import { describe, it, expect } from "vitest";
import { buildEnquiryEmailBody, buildMailOptions } from "./enquiryMail";

describe("enquiry mail builder", () => {
  it("builds a readable enquiry email body", () => {
    const form = {
      name: "Jane Doe",
      company: "Acme Labs",
      email: "jane@acme.com",
      phone: "+91 9988776655",
      product: "Website Development",
      details: "We need a new ERP website and SEO support.",
    };

    const body = buildEnquiryEmailBody(form);

    expect(body).toContain("Jane Doe");
    expect(body).toContain("Acme Labs");
    expect(body).toContain("Website Development");
    expect(body).toContain("We need a new ERP website and SEO support.");
  });

  it("builds the mail payload with the receiver and reply-to details", () => {
    const form = {
      name: "Jane Doe",
      company: "Acme Labs",
      email: "jane@acme.com",
      phone: "+91 9988776655",
      product: "Website Development",
      details: "We need a new ERP website and SEO support.",
    };

    const mail = buildMailOptions(form, "utsappcreate@gmail.com");

    expect(mail.to).toBe("utsappcreate@gmail.com");
    expect(mail.replyTo).toBe("notification@unitdtechnologies.com");
    expect(mail.subject).toContain("New Enquiry Submitted");
  });
});
