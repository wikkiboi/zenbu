import { Anime } from "../api/types";
import ImageWithLoader from "./ImageWithLoader";
import ListSkeleton from "../skeleton/ListSkeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { nanoid } from "nanoid";

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
            <Link
              className="btn-ghost transition-all ease-in-out duration-300 flex flex-col p-3 rounded will-change-transform mx-auto w-11/12"
              key={anime.mal_id}
              title={anime.title}
              to={`/anime/${anime.mal_id}`}
            >
              <ImageWithLoader
                key={anime.mal_id}
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                showRank={showRank}
                rank={showRank ? anime.rank : undefined}
              />
              <h2 className="truncate max-w-40 text-center font-semibold text-md mx-auto">
                {anime.title}
              </h2>
              <div className="mx-auto">
                {anime.genres.slice(0, 3).map((genre) => (
                  <button
                    className="btn btn-xs border border-gray-500 text-[8px] mx-[1px] rounded-xl"
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      navigate({
                        to: `/search?genres=${genre.name}`,
                      });
                    }}
                    key={nanoid()}
                  >
                    {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
                  </button>
                ))}
              </div>
            </Link>
          );
        })}
    </>
  );
}
