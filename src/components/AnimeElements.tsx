import { Anime } from "../api/types";
import ImageWithLoader from "./ImageWithLoader";
import { Link, useNavigate } from "@tanstack/react-router";
import AnimeModal from "./AnimeModal";
import { AnimatePresence, motion } from "framer-motion";
interface AnimeElementProps {
  animeData?: Anime[];
  isLoading: boolean;
  elementCount?: number;
  showRank?: boolean;
}

function ListSkeleton() {
  return (
    <div className="py-2">
      <div className="skeleton aspect-[7/10] mx-auto mb-2 rounded w-10/12" />
      <div className="flex gap-2 w-24 mx-auto mt-2">
        <div className="skeleton mx-auto w-8 h-4" />
        <div className="skeleton mx-auto w-8 h-4" />
        <div className="skeleton mx-auto w-8 h-4" />
      </div>
    </div>
  );
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
    <AnimatePresence mode="wait">
      {!uniqueData &&
        Array.from({ length: elementCount }, (_, index) => (
          <ListSkeleton key={index} />
        ))}
      {uniqueData &&
        !isLoading &&
        uniqueData.map((anime: Anime) => {
          return (
            <motion.div
              key={anime.mal_id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="my-auto"
            >
              <button
                className="btn-ghost transition-all ease-in-out duration-300 flex flex-col px-3 py-2 pt-4 sm:pt-3 max-md:p-2  rounded will-change-auto mx-auto w-full"
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
                {/* <h2 className="truncate md:max-w-40 max-w-32 text-center font-semibold md:text-base text-xs max-sm:text-[10px] mb-1 mx-auto max-sm:hidden">
                  {anime.title}
                </h2> */}
                <div className="flex gap-0.5 w-full justify-center">
                  {anime.genres.slice(0, 3).map((genre) => (
                    <Link
                      className="btn h-4 min-h-4  sm:btn-xs border border-zinc-500 sm:text-[8px] text-[6px] sm:px-2 px-1 rounded-xl hover:bg-secondary hover:text-secondary-content hover:border-transparent"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        navigate({
                          to: `/search?genres=${genre.name}`,
                        });
                      }}
                      to={`/search?genres=${genre.name}`}
                      key={genre.name + anime.mal_id}
                    >
                      {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
                    </Link>
                  ))}
                </div>
              </button>
              <dialog id={`anime-modal-${anime.mal_id}`} className="modal">
                <AnimeModal anime={anime} />
              </dialog>
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
}
