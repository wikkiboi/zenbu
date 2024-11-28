import { Anime } from "../api/types";
import ImageWithLoader from "./ImageWithLoader";
import ListSkeleton from "../skeleton/ListSkeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import AnimeModal from "./AnimeModal";

interface AnimeElementProps {
  animeData?: Anime[];
  isLoading: boolean;
  elementCount?: number;
  showRank?: boolean;
}

export default function AnimeElements({
  animeData,
  isLoading,
  elementCount = 15,
  showRank = false,
}: AnimeElementProps) {
  const navigate = useNavigate();
  // Filter out duplicate elements
  const uniqueData = animeData?.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  return (
    <>
      {!uniqueData &&
        Array.from({ length: elementCount }, (_, index) => (
          <ListSkeleton key={index} />
        ))}
      {uniqueData &&
        !isLoading &&
        uniqueData.map((anime: Anime) => {
          return (
            <div key={anime.mal_id}>
              <button
                className="btn-ghost transition-all ease-in-out duration-300 flex flex-col py-3 rounded will-change-auto mx-auto w-11/12"
                onClick={() => {
                  const dialog = document.getElementById(
                    `anime-modal-${anime.mal_id}`
                  ) as HTMLDialogElement;
                  dialog.showModal();
                }}
                key={anime.mal_id}
                title={anime.title}
              >
                <ImageWithLoader
                  key={anime.mal_id}
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                  showRank={showRank}
                  rank={showRank ? anime.rank : undefined}
                />
                <h2 className="truncate md:max-w-40 max-w-28 text-center font-semibold md:text-md text-sm mx-auto mb-1">
                  {anime.title}
                </h2>
                <div className="mx-auto flex gap-0.5">
                  {anime.genres.slice(0, 3).map((genre) => (
                    <Link
                      className="btn h-4 min-h-4  md:btn-xs border border-gray-500 md:text-[8px] text-[6px] md:px-2 px-1 rounded-xl"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        navigate({
                          to: `/search?genres=${genre.name}`,
                        });
                      }}
                      to={`/search?genres=${genre.name}`}
                      key={nanoid()}
                    >
                      {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
                    </Link>
                  ))}
                </div>
              </button>
              <dialog id={`anime-modal-${anime.mal_id}`} className="modal">
                <AnimeModal anime={anime} />
              </dialog>
            </div>
          );
        })}
    </>
  );
}
