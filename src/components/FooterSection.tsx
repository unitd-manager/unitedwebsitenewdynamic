import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomeContent } from "@/hooks/useHomeContent";

const FooterSection = () => {
  const { content } = useHomeContent();
  const footer = content?.sections?.footer;
  const brand = content?.sections?.brand;
  const socialIcons: Record<string, typeof Facebook> = {
    Facebook,
    Instagram,
    LinkedIn: Linkedin,
  };
  if (!footer || !brand) return null;

  return (
    <footer className="border-t border-white/10 bg-[#040811] pt-16 pb-8">
      <div className="container mx-auto px-6">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-3">

          {/* Logo / Social */}
          <div>
            <div className="mb-5 w-fit rounded-lg bg-white p-2">
              <img
                src={brand.logo || ""}
                alt={brand.logoAlt || ""}
                className="h-12 w-auto"
              />
            </div>

            <p className="max-w-xs text-sm leading-6 text-[#718198]">
              {footer.description}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {(footer.socialLinks || []).map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full
                      border border-white/10
                      text-[#718198]
                      transition-all duration-300
                      hover:border-[#00A8FF]
                      hover:text-[#00A8FF]
                    "
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : link.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 font-heading text-lg font-semibold text-white">
              {footer.servicesHeading}
            </h4>

            <ul className="space-y-3">
              {(footer.links || []).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="
                      text-sm
                      text-[#718198]
                      transition-colors duration-300
                      hover:text-[#00A8FF]
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-heading text-lg font-semibold text-white">
              {footer.contactHeading}
            </h4>

            <div className="flex items-start gap-3 text-sm text-[#718198]">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#00A8FF]" />

              <a
                href={`mailto:${footer.email || ""}`}
                className="transition-colors duration-300 hover:text-[#00A8FF]"
              >
                {footer.email}
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT / LEGAL
        ===================================================== */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-[#617087] sm:flex-row">

          <span>
            {footer.copyrightPrefix} {new Date().getFullYear()} {footer.copyright}
          </span>

          <div className="flex items-center gap-3">
            <Link
              to={footer.termsHref || ""}
              className="transition-colors duration-300 hover:text-[#00A8FF]"
            >
              {footer.termsLabel}
            </Link>

            <span className="text-white/20">
              |
            </span>

            <Link
              to={footer.privacyHref || ""}
                          className="transition-colors duration-300 hover:text-[#00A8FF]"

            >
              {footer.privacyLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;