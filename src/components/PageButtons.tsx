import { Link } from "@tanstack/react-router";
import { Pagination } from "../api/types/types";
import { HomeParams } from "../pages/homepage/Homepage";

interface PageButtonProps {
  pagination: Pagination;
}
export default function PageButtons({ pagination }: PageButtonProps) {
  const { current_page, has_next_page } = pagination;

  return (
    <div className="join">
      {current_page > 1 && (
        <Link
          className="join-item btn"
          to="."
          search={(prev: HomeParams) => ({
            ...prev,
            page: current_page - 1,
          })}
        >
          «
        </Link>
      )}
      <button className="join-item btn no-animation">{current_page}</button>
      {has_next_page && (
        <Link
          className="join-item btn"
          to="."
          search={(prev: HomeParams) => ({
            ...prev,
            page: current_page + 1,
          })}
        >
          »
        </Link>
      )}
    </div>
  );
}
