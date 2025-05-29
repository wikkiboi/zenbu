import { Link } from "@tanstack/react-router";
import { HomeParams } from "../../pages/homepage/Homepage";
import { scrollToTop } from "../../helper";

interface PageLinkProps {
  page: number;
  lastPage: number;
  currentPage?: number;
}

export default function PageLink({
  page,
  lastPage,
  currentPage,
}: PageLinkProps) {
  return page >= 1 && page <= lastPage ? (
    <Link
      to="."
      onClick={scrollToTop}
      className={`transition-all duration-200 ease-in-out btn-ghost tab border-none ${
        page === currentPage ? "tab-active" : ""
      }`}
      role="tab"
      search={(prev: HomeParams) => {
        return {
          ...prev,
          page,
        };
      }}
    >
      {page}
    </Link>
  ) : null;
}
