import { Link } from "@tanstack/react-router";
import { Anime } from "../../types";

interface ShortSearchResultsProps {
  searchData?: Anime[];
}
export default function ShortSearchResults({
  searchData,
}: ShortSearchResultsProps) {
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
                  onClick={() => {
                    const modal = document.getElementById(
                      "search-input"
                    ) as HTMLDialogElement;
                    modal?.close();
                  }}
                >
                  <img
                    src={search.images.webp.image_url}
                    className="w-8 aspect-[7/10] object-cover mr-2"
                  />
                  <div className="flex flex-col w-10/12 md:11/12">
                    <h1 className="font-bold text-sm truncate overflow-hidden text-ellipses hover:underline">
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
