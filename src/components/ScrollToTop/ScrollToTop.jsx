import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // 1. Admin Fixed Container Scroll
    const adminContainer = document.querySelector(".main-content");
    if (adminContainer) {
      adminContainer.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // 2. Window Scroll (Public Pages)
    // We try multiple methods to ensure it works across all browsers/modes
    window.scrollTo(0, 0);

    // Modern smooth/instant option
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch (e) {
      // Ignore errors in older browsers
    }

    // Fallback for documentElement and body
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
