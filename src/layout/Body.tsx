import React from "react";

interface BodyProps {
  children: React.ReactNode;
}
export default function Body({ children }: BodyProps) {
  return (
    <main className="p-4 min-h-screen relative w-full bg-[#414558]">
      {children}
    </main>
  );
}
