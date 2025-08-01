import { Link } from "@tanstack/react-router";
import { scrollToTop } from "../helper";

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}
export default function NavLink({ children, path }: NavLinkProps) {
  return (
    <Link
      onClick={() => scrollToTop("instant")}
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
