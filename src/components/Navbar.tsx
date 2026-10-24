import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { useCmsItems } from "@/hooks/useCmsContent";
import { useHomeContent } from "@/hooks/useHomeContent";

type NavigationLink = {
  label: string;
  href: string;
  type?: string;
  dropdown?: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
};

const SOLID_NAV_PAGES = [
  "/products",
  "/contact",
  "/enquiryNow",
  "/trading-management",
  "/payroll-management",
  "/project-management",
  "/school-management",
  "/smart-construction-crm-software",
  "/customer-relationship-management",
  "/enterprise-resource-planning",
  "/seo-optimization",
  "/search-engine-marketing",
  "/social-media-marketing",
  "/website-development",
  "/mobileapp-development",
  "/cloud-hosting",
  "/blog",
  "/quantum-computing",
  "/ai-2030",
  "/ransomware-protection",
  "/cybersecurity-development",
  "/cloud-computing",
  "/ai-healthcare",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { content } = useHomeContent();
  const { data: navigationItems } = useCmsItems("navigation");
  const productsQuery = useCmsItems("product");
  const products = productsQuery.data || [];
  const configuredLinks = navigationItems?.find((item) => item.slug === "main")?.content.links;
  const navLinks: NavigationLink[] = Array.isArray(configuredLinks)
    ? (configuredLinks as NavigationLink[]).map((link) => ({
        ...link,
        ...(link.label === "Products" && productsQuery.isSuccess
          ? {
              dropdown: products.map((product) => ({
                label: product.title,
                href: String(product.content.href || `/${product.slug}`),
              })),
            }
          : {}),
      }))
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }
  }, [open]);

  const forceSolid = SOLID_NAV_PAGES.some(
    (page) =>
      location.pathname === page ||
      location.pathname.startsWith(page + "/")
  );

  const isSolid = scrolled || forceSolid;

  /*
   * Privacy Policy uses the site's dark theme.
   * It should NOT become the blue navbar.
   */
  const isPrivacyPolicy =
    location.pathname === "/privacy-policy";

  const navBackground = isPrivacyPolicy
    ? "bg-[#080D19]/95 shadow-lg backdrop-blur-md"
    : isSolid
      ? "bg-[#00A8FF] shadow-lg"
      : "bg-transparent";

  const navText = isPrivacyPolicy
    ? "text-white hover:text-[#00A8FF]"
    : "text-white hover:text-cyan-200";

  const handleAnchor = (href: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .querySelector(href)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${navBackground}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          {content?.sections?.brand?.logo && (
            <img
              src={content.sections.brand.logo}
              alt={content.sections.brand.logoAlt || ""}
              className="h-12 w-auto object-contain sm:h-14 md:h-16"
            />
          )}
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}
        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="group relative"
            >
              {link.dropdown ? (
                <button
                  type="button"
                  className={`flex cursor-default items-center gap-1 font-medium transition-all duration-300 ${navText}`}
                >
                  {link.label}
                  <span className="text-xs">▼</span>
                </button>
              ) : link.type === "route" ? (
                <Link
                  to={link.href}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className={`font-medium transition-all duration-300 ${navText}`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAnchor(link.href)}
                  className={`font-medium transition-all duration-300 ${navText}`}
                >
                  {link.label}
                </button>
              )}

              {/* Desktop Dropdown */}
              {link.dropdown && (
                <div
                  className="
                    invisible absolute left-0 top-full z-50
                    w-64 pt-3 opacity-0
                    pointer-events-none
                    transition-opacity duration-200
                    group-hover:visible
                    group-hover:pointer-events-auto
                    group-hover:opacity-100
                  "
                >
                  <div className="rounded-md border border-white/10 bg-[#0B1220] py-2 shadow-xl">
                    {link.dropdown.map((item) => (
                      <div
                        key={item.label}
                        className="group/item relative"
                      >
                        {item.href.startsWith("#") ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleAnchor(item.href)
                            }
                            className="block w-full px-4 py-2 text-left text-white hover:bg-[#111C2E]"
                          >
                            {item.label}
                          </button>
                        ) : item.children ? (
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-[#111C2E]"
                          >
                            <span>{item.label}</span>
                            <span className="text-xs">▼</span>
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-white hover:bg-[#111C2E]"
                          >
                            {item.label}
                          </Link>
                        )}

                        {/* Nested dropdown */}
                        {item.children && (
                          <div
                            className="
                              invisible absolute left-full top-0 z-50
                              ml-1 w-56 rounded-md
                              border border-white/10
                              bg-[#0B1220] py-2
                              opacity-0
                              pointer-events-none
                              transition-opacity duration-200
                              group-hover/item:visible
                              group-hover/item:pointer-events-auto
                              group-hover/item:opacity-100
                            "
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() =>
                                  setOpen(false)
                                }
                                className="block px-4 py-2 text-sm text-[#B6C5D9] hover:bg-[#111C2E] hover:text-[#00A8FF]"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Enquiry button */}
        <button
          type="button"
          onClick={() => navigate("/enquiryNow")}
          className="
            hidden items-center gap-2
            rounded-full
            bg-white
            px-7 py-3
            text-sm font-semibold
            text-[#00A8FF]
            shadow-lg
            transition-all duration-300
            hover:scale-105
            md:inline-flex
          "
        >
          Enquiry Now →
        </button>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label={content?.sections?.brand?.menuToggleLabel || ""}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-[#080D19] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="border-b border-white/10"
                >
                  <div className="flex items-center justify-between">
                    {link.dropdown ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label
                              ? null
                              : link.label
                          )
                        }
                        className="flex w-full items-center justify-between py-3 font-bold text-white transition-colors hover:text-[#00A8FF]"
                      >
                        <span>{link.label}</span>

                        <ChevronRight
                          size={18}
                          className={`transition-transform duration-300 ${
                            openDropdown === link.label
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      </button>
                    ) : link.type === "route" ? (
                      <Link
                        to={link.href}
                        onClick={() => {
                          closeMobileMenu();

                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="block w-full py-3 font-bold text-white transition-colors hover:text-[#00A8FF]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleAnchor(link.href)
                        }
                        className="block w-full py-3 text-left font-bold text-white transition-colors hover:text-[#00A8FF]"
                      >
                        {link.label}
                      </button>
                    )}
                  </div>

                  {/* Mobile dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-3 pl-4">
                            {link.dropdown.map(
                              (item) => (
                                <div
                                  key={item.label}
                                >
                                  {item.href.startsWith(
                                    "#"
                                  ) ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAnchor(
                                          item.href
                                        )
                                      }
                                      className="block w-full py-2 text-left text-sm text-[#A9B8CB] hover:text-[#00A8FF]"
                                    >
                                      {item.label}
                                    </button>
                                  ) : item.children ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenSubDropdown(
                                            openSubDropdown ===
                                              item.label
                                              ? null
                                              : item.label
                                          )
                                        }
                                        className="flex w-full items-center justify-between py-2 text-sm text-[#A9B8CB] hover:text-[#00A8FF]"
                                      >
                                        <span>
                                          {item.label}
                                        </span>

                                        <ChevronRight
                                          size={14}
                                          className={`transition-transform duration-300 ${
                                            openSubDropdown ===
                                            item.label
                                              ? "rotate-90"
                                              : ""
                                          }`}
                                        />
                                      </button>

                                      <AnimatePresence>
                                        {openSubDropdown ===
                                          item.label && (
                                          <motion.div
                                            initial={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            animate={{
                                              height: "auto",
                                              opacity: 1,
                                            }}
                                            exit={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            transition={{
                                              duration: 0.25,
                                            }}
                                            className="overflow-hidden"
                                          >
                                            <div className="flex flex-col gap-1 pb-1 pl-4">
                                              {item.children.map(
                                                (child) => (
                                                  <Link
                                                    key={
                                                      child.label
                                                    }
                                                    to={
                                                      child.href
                                                    }
                                                    onClick={
                                                      closeMobileMenu
                                                    }
                                                    className="block py-1.5 text-xs text-[#90A1B8] hover:text-[#00A8FF]"
                                                  >
                                                    {
                                                      child.label
                                                    }
                                                  </Link>
                                                )
                                              )}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <Link
                                      to={item.href}
                                      onClick={
                                        closeMobileMenu
                                      }
                                      className="block py-2 text-sm text-[#A9B8CB] hover:text-[#00A8FF]"
                                    >
                                      {item.label}
                                    </Link>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}

              {/* Mobile enquiry */}
              <li className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/enquiryNow");
                  }}
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#00A8FF]"
                >
                  Enquiry Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;