import { Pagination } from "../api/types/types";

interface PageButtonProps {
  pagination: Pagination;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function PageButtons({
  pagination,
  page,
  setPage,
}: PageButtonProps) {
  const { current_page, has_next_page, last_visible_page } = pagination;

  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (current_page < last_visible_page) {
      setPage(page + 1);
    }
  }

  return (
    <div>
      {current_page > 1 && (
        <button className="btn" onClick={handlePrev}>
          Prev
        </button>
      )}
      {has_next_page && (
        <button className="btn" onClick={handleNext} disabled={!has_next_page}>
          Next
        </button>
      )}
    </div>
  );
}
