import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { fetchSearchAnime } from "../../api/fetch";
import { useDebounce } from "use-debounce";
import ShortSearchResults from "./short-search-results";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface ShortSearchBarProps {
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (state: boolean) => void;
}

export default function ShortSearchBar({
  isSearchModalOpen,
  setIsSearchModalOpen,
}: ShortSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 750);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const queryClient = useQueryClient();

  const { data, error, isFetching } = useQuery({
    queryKey: ["searchResults", debouncedQuery],
    queryFn: () => fetchSearchAnime({ q: debouncedQuery, limit: 10 }),
    enabled: debouncedQuery.length > 0 && isSearchModalOpen,
    refetchOnWindowFocus: false,
  });

  const searchData = data?.data;
  if (error instanceof Error && !isFetching) {
    toast.error("Error fetching search results");
    console.log(error.message);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsSearchModalOpen(false);
      setSearchQuery("");
    };

    if (!dialog.open) {
      handleClose();
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [setIsSearchModalOpen]);

  function closeModal() {
    modalRef.current?.close();
    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] === "searchResults",
    });
  }

  return (
    <dialog id="search-modal" className="modal" ref={modalRef}>
      <div className="modal-box pb-2 bg-neutral">
        <h1 className="font-bold mb-3">Search</h1>
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none shadow-none"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>
        <div className="flex flex-col">
          <input
            id="search-input"
            type="text"
            className={`input input-bordered rounded-xl w-full mb-2 ${
              isFetching && "opacity-70"
            }`}
            onChange={handleChange}
            value={searchQuery}
            placeholder="Search anime..."
          ></input>
          {debouncedQuery.length > 0 && (
            <ShortSearchResults searchData={searchData} />
          )}
          <div className="ml-auto mr-1">
            <Link
              className="link link-hover text-xs opacity-40"
              to="/search"
              onClick={closeModal}
              search={() => ({ q: searchQuery })}
            >
              Advanced Search Filters »
            </Link>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          className="cursor-default"
          aria-hidden="true"
          onClick={closeModal}
        >
          close
        </button>
      </form>
    </dialog>
  );
}
