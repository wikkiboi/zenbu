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
            if (search.year === undefined) {
              year = search.aired.from ? search.aired.from.slice(0, 4) : "";
            } else {
              year = search.year;
            }

            return (
              <div className="result-container" key={search.mal_id}>
                <Link to={`/anime/${search.mal_id}`} className="result-card">
                  <div className="result-image">
                    <img src={search.images.webp.image_url} />
                  </div>
                  <div className="result-info">
                    <h1>{search.title_english || search.title}</h1>
                    <h2>{`(${search.type}, ${year})`}</h2>
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
