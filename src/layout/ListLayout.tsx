import React from "react";

interface ListLayoutProps {
  children: React.ReactNode;
  isFetching: boolean;
}

// bg-[#282a36]
export default function ListLayout({ children, isFetching }: ListLayoutProps) {
  return (
    <div
      className={`grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 sm:grid-cols-3 grid-cols-3 mx-auto max-w-7xl rounded-xl p-6 max-md:p-3 transition-all duration-500 items-start bg-base-100 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
