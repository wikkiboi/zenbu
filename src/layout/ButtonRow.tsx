interface ButtonRowProps {
  children: React.ReactNode;
}

export default function ButtonRow({ children }: ButtonRowProps) {
  return (
    <div className="flex items-center w-11/12  mx-auto py-2 relative h-12">
      {children}
    </div>
  );
}
