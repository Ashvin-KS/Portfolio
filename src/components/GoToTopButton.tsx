"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 6000) { // Show button after scrolling down 6000px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 p-3 rounded-full bg-gray-800/70 text-white cursor-pointer transition-opacity duration-300 animate-pulse-white ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp className="h-6 w-6" />
    </div>
  );
}