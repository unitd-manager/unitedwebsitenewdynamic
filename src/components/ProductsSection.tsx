import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-dark.svg";

const navLinks = [
  { label: "Home", href: "/", type: "route" },
  { label: "About Us", href: "/about", type: "route" },
  {
    label: "Products",
    href: "/products",
    type: "route",
    dropdown: [
      { label: "Trading Management Software", href: "/trading-management" },
      { label: "Payroll Management Software", href: "/payroll-management" },
      { label: "Project Management Software", href: "/project-management" },
      { label: "School Management Software", href: "/school-management" },
      { label: "Smart Construction CRM Software", href: "/smart-construction-crm-software" },
      { label: "Customer Relationship Management", href: "/customer-relationship-management" },
      { label: "Enterprise Resource Planning", href: "/enterprise-resource-planning" },
    ],
  },
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
];

// Pages where the navbar should always show the solid/blue background,
// even at the top of the page (no transparent hero look).
const SOLID_NAV_PAGES = [
  "/products",
  "/contact",
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
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const forceSolid = SOLID_NAV_PAGES.includes(location.pathname);
  const isSolid = scrolled || forceSolid;

  const handleAnchor = (href: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isSolid ? "bg-[#00A8FF] shadow-lg" : "bg-transparent"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-4 md:py-5">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="United Technologies Logo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-lg"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group">
              {link.type === "route" ? (
                <Link
                  to={link.href}
                  className="text-white font-medium transition-all duration-300 hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAnchor(link.href)}
                  className="text-white font-medium transition-all duration-300 hover:text-cyan-200"
                >
                  {link.label}
                </button>
              )}

              {link.dropdown && (
                <div
                  className="absolute top-full left-0 pt-3 -mt-1 w-64 z-50
                             invisible opacity-0 pointer-events-none
                             group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
                             transition-opacity duration-200"
                >
                  <div className="bg-[#00A8FF] shadow-lg rounded-md py-2">
                    {link.dropdown.map((item) => (
                      <div key={item.label} className="relative group/item">
                        {item.href.startsWith("#") ? (
                          <button
                            type="button"
                            onClick={() => handleAnchor(item.href)}
                            className="block w-full text-left px-4 py-2 text-white hover:bg-[#0099E6]"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-white hover:bg-[#0099E6]"
                          >
                            {item.label}
                          </Link>
                        )}

                        {item.children && (
                          <div
                            className="absolute left-full top-0 ml-1 w-56 rounded-md bg-[#0099E6] shadow-lg py-2 z-50
                                       invisible opacity-0 pointer-events-none
                                       group-hover/item:visible group-hover/item:opacity-100 group-hover/item:pointer-events-auto
                                       transition-opacity duration-200"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-2 text-sm text-cyan-50 hover:bg-[#00A8FF] hover:text-white"
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

        <button
          type="button"
          onClick={() => navigate("/enquiryNow")}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#00A8FF] shadow-lg transition-all duration-300 hover:scale-105"
        >
          Enquiry Now →
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#00A8FF] md:hidden"
          >
            <ul className="flex flex-col gap-5 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.type === "route" ? (
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="text-white font-bold transition-colors hover:text-cyan-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAnchor(link.href)}
                      className="text-white font-bold transition-colors hover:text-cyan-200"
                    >
                      {link.label}
                    </button>
                  )}
                  {link.dropdown && (
                    <div className="mt-2 flex flex-col gap-2 pl-4">
                      {link.dropdown.map((item) => (
                        <div key={item.label}>
                          {item.href.startsWith("#") ? (
                            <button
                              type="button"
                              onClick={() => handleAnchor(item.href)}
                              className="text-left text-sm text-cyan-100 hover:text-white"
                            >
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              to={item.href}
                              onClick={() => setOpen(false)}
                              className="text-sm text-cyan-100 hover:text-white"
                            >
                              {item.label} 
                            </Link>
                          )}
                          {item.children && (
                            <div className="mt-1 flex flex-col gap-1 pl-3">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={() => setOpen(false)}
                                  className="text-xs text-cyan-50 hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              <li>
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