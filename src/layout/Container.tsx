interface ContainerProps {
  children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
  return <div className="flex flex-col m-2">{children}</div>;
}
