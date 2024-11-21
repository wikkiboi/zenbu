interface ButtonRowProps {
  children: React.ReactNode;
}

export default function ButtonRow({ children }: ButtonRowProps) {
  return (
    <div className="flex items-center w-full mx-auto py-2">{children}</div>
  );
}
