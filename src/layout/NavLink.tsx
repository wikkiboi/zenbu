import { Link } from "@tanstack/react-router";

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}
export default function NavLink({ children, path }: NavLinkProps) {
  return (
    <Link
      className="btn btn-ghost p-3"
      activeProps={{
        className: "link",
      }}
      to={path}
    >
      {children}
    </Link>
  );
}
