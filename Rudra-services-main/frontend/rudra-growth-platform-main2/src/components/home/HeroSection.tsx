import { useState, useEffect } from "react";
import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = () => {
      checkMobile();
    };

    mql.addEventListener("change", handleChange);
    
    // Also listen to window resize as fallback
    window.addEventListener("resize", checkMobile);

    return () => {
      mql.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Don't render anything until we know the screen size (prevents hydration mismatch)
  if (isMobile === undefined) {
    return null;
  }

  // Only render ONE hero at a time - the other won't be in DOM or download assets
  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default HeroSection;
