import { Pagination } from "../api/types";
import PageLink from "./PageLink";

interface PageButtonProps {
  pagination: Pagination;
}
export default function PageButtons({ pagination }: PageButtonProps) {
  const { current_page, last_visible_page } = pagination;

  return (
    <div className="flex grow flex-row justify-center inset-0 absolute gap-3 py-2">
      {pagination && (
        <>
          {current_page >= 3 && (
            <div className="tabs tabs-boxed tabs-sm rounded-lg bg-[#1f202a] items-center">
              <PageLink
                page={1}
                lastPage={last_visible_page}
                currentPage={current_page}
              />
            </div>
          )}

          <div
            className="bg-[#1f202a] flex tabs tabs-boxed tabs-sm items-center gap-1"
            role="tablist"
          >
            <PageLink
              page={current_page - 1}
              lastPage={last_visible_page}
              currentPage={current_page}
            />
            <PageLink
              page={current_page}
              lastPage={last_visible_page}
              currentPage={current_page}
            />
            <PageLink
              page={current_page + 1}
              lastPage={last_visible_page}
              currentPage={current_page}
            />
          </div>
          {current_page <= last_visible_page - 2 && (
            <div className="tabs tabs-boxed tabs-sm rounded-lg bg-[#1f202a] items-center">
              <PageLink
                page={last_visible_page}
                lastPage={last_visible_page}
                currentPage={current_page}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
