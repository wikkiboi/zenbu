import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../helper";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => scrollToTop("smooth")}
      className={`fixed flex items-center bottom-4 right-4 z-50 rounded-full p-2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-primary text-primary-content shadow-lg hover:bg-primary/90`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
      <span className="max-md:hidden">Scroll To Top</span>
    </button>
  );
}
