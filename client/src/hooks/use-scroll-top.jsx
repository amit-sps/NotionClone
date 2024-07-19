import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
        // console.log("scrolled", scrolled);
      } else {
        setScrolled(false);
        // console.log("scrolled", scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return()=> window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};
