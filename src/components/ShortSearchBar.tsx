import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchSearchAnime } from "../api/fetch";
import { useDebounce } from "use-debounce";
import ShortSearchResults from "./ShortSearchResults";

export default function ShortSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 1000);
  const { data, error, isFetching } = useQuery({
    queryKey: ["searchResults", debouncedQuery],
    queryFn: () => fetchSearchAnime({ q: debouncedQuery, limit: 10 }),
    placeholderData: keepPreviousData,
    enabled: debouncedQuery.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10,
    gcTime: 1000 * 10,
  });

  const searchData = data?.data;
  if (error instanceof Error && !isFetching)
    return <div>Error: {error.message}</div>;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="modal-box pb-2 bg-neutral">
      <h1 className="font-bold mb-3">Search</h1>
      <form method="dialog" className="modal-backdrop">
        <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-neutral border-none shadow-none">
          ✕
        </button>
      </form>
      <div className="flex flex-col">
        <input
          type="text"
          className="input input-bordered rounded-xl w-full mb-2"
          onChange={handleChange}
          placeholder="Search anime"
        ></input>
        <ShortSearchResults
          searchData={searchData}
          searchQuery={searchQuery}
          debouncedQuery={debouncedQuery}
        />
      </div>
    </div>
  );
}
