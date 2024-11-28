import { Link } from "@tanstack/react-router";
import { Anime } from "../api/types";

interface ShortSearchResultsProps {
  searchData?: Anime[];
  debouncedQuery: string;
}
export default function ShortSearchResults({
  searchData,
  debouncedQuery,
}: ShortSearchResultsProps) {
  if (debouncedQuery === "") searchData = [];
  return (
    <>
      {searchData && searchData.length > 1 && (
        <div className="bg-base-100 rounded-xl p-4">
          {searchData.map((search) => {
            let year;
            if (search.year == undefined) {
              year = search.aired.from ? search.aired.from.slice(0, 4) : "";
            } else {
              year = search.year.toString();
            }

            return (
              <div className="flex" key={search.mal_id}>
                <Link
                  to={`/anime/${search.mal_id}`}
                  className="flex btn-ghost rounded p-1 transition duration-200 ease-in-out w-full"
                >
                  <img
                    src={search.images.webp.image_url}
                    className="w-8 aspect-[7/10] object-cover mr-2"
                  />
                  <div className="flex flex-col md:max-w-80 max-w-60">
                    <h1 className="font-bold text-sm truncate">
                      {search.title_english || search.title}
                    </h1>
                    <h2 className="text-xs">{`(${search.type}, ${year})`}</h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
