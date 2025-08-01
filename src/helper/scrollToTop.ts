type scrollBehavior = "auto" | "smooth" | "instant";

export const scrollToTop = (behavior: scrollBehavior = "smooth") => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior });
  }, 100);
};
