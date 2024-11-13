import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchSearchAnime } from "../api/fetchSearchAnime";
import { useDebounce } from "use-debounce";

export default function ShortSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 1000);
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["searchResults", debouncedQuery],
    queryFn: () => fetchSearchAnime({ q: debouncedQuery }),
    enabled: debouncedQuery.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10,
    gcTime: 1000 * 10,
  });

  const searchData = data?.data;
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error && !isFetching)
    return <div>Error: {error.message}</div>;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  if (searchData) console.log(searchData);

  return (
    <div className="flex">
      <input
        type="text"
        className="input grow rounded-3xl"
        onChange={handleChange}
        placeholder="Search"
      ></input>
    </div>
  );
}
