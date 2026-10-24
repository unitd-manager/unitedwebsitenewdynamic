import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top whenever the route changes.
 *
 * If the URL contains a hash such as:
 * /#services
 *
 * it scrolls to that section instead.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Handle URLs containing a hash.
    // Example: /#services
    if (hash) {
      const id = hash.replace("#", "");

      const timeout = setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);

      return () => clearTimeout(timeout);
    }

    // For normal routes, always start at the top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;