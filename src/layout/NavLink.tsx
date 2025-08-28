import { Link } from "@tanstack/react-router";
import { scrollToTop } from "../helper";

interface NavLinkProps {
  children: React.ReactNode;
  activeStyle: string;
  path: string;
}
export default function NavLink({ children, path, activeStyle }: NavLinkProps) {
  return (
    <Link
      onClick={() => scrollToTop("instant")}
      className={`btn p-3 ${activeStyle}`}
      to={path}
    >
      {children}
    </Link>
  );
}
