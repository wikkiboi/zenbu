interface ButtonRowProps {
  children: React.ReactNode;
}

export default function ButtonRow({ children }: ButtonRowProps) {
  return (
    <div className="flex items-center w-full max-w-7xl  mx-auto py-2 md:px-3 relative h-12">
      {children}
    </div>
  );
}
