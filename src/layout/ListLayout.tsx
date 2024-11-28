import React from "react";

interface ListLayoutProps {
  children: React.ReactNode;
  isFetching: boolean;
}

// bg-[#282a36]
export default function ListLayout({ children, isFetching }: ListLayoutProps) {
  return (
    <div
      className={`grid gap-1 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mx-auto min-h-screen w-11/12 rounded-xl p-6 transition-all duration-500 items-start bg-base-100 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
