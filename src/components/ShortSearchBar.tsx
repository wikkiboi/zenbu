import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { fetchSearchAnime } from "../api/fetch";
import { useDebounce } from "use-debounce";
import ShortSearchResults from "./ShortSearchResults";
import { Link } from "@tanstack/react-router";

export default function ShortSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 1000);
  const queryClient = useQueryClient();

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const { data, error, isFetching } = useQuery({
    queryKey: ["searchResults", debouncedQuery],
    queryFn: () => fetchSearchAnime({ q: debouncedQuery, limit: 10 }),
    enabled: debouncedQuery.length > 0,
    refetchOnWindowFocus: false,
  });

  const searchData = data?.data;
  if (error instanceof Error && !isFetching)
    return <div>Error: {error.message}</div>;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function closeModal() {
    setSearchQuery("");
    queryClient.removeQueries({ queryKey: ["searchResults"] });
    modalRef.current?.close();
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
            type="text"
            className="input input-bordered rounded-xl w-full mb-2"
            onChange={handleChange}
            value={searchQuery}
            placeholder="Search anime..."
          ></input>
          <ShortSearchResults
            searchData={searchData}
            debouncedQuery={debouncedQuery}
          />
          <div className="ml-auto mr-1">
            <Link
              className="link link-hover text-xs opacity-40"
              to="/search"
              onClick={closeModal}
              search={() => ({ q: debouncedQuery })}
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
