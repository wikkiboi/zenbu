import React from "react";
import ScrollToTopButton from "../components/scroll-to-top-button";

interface BodyProps {
  children: React.ReactNode;
}
export default function Body({ children }: BodyProps) {
  return (
    <main className="p-4 min-h-screen relative w-full bg-neutral">
      {children}
      <ScrollToTopButton />
    </main>
  );
}
