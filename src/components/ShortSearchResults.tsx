import { Link } from "@tanstack/react-router";
import { Anime } from "../api/types";

interface ShortSearchResultsProps {
  searchData?: Anime[];
  searchQuery: string;
  debouncedQuery: string;
}
export default function ShortSearchResults({
  searchData,
  searchQuery,
  debouncedQuery,
}: ShortSearchResultsProps) {
  if (debouncedQuery === "") searchData = [];
  return (
    <>
      {searchData && searchData.length > 1 && (
        <div className="bg-base-100 rounded-xl p-4">
          {searchData.map((anime) => (
            <div key={anime.mal_id}>{anime.title}</div>
          ))}
        </div>
      )}
      <div className="ml-auto mr-1">
        <Link
          className="link link-hover text-xs opacity-40"
          to="/search"
          search={() => ({ q: searchQuery })}
        >
          Advanced Search Filters »
        </Link>
      </div>
    </>
  );
}
