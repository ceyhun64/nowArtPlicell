"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll durumunu kontrol et
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Event listener ekle
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-8 right-3 p-3 rounded-full bg-[#92e676]/80 border border-[#92e676]/50 hover:bg-[#92e676] transition-colors z-50"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-green-900" />
    </button>
  );
};

export default ScrollToTopButton;
