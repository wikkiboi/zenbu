import { Anime } from "../api/types/types";

interface AnimeElementProps {
  animeData: Anime[];
  isFetching: boolean;
  showRank?: boolean;
}

export default function AnimeElements({
  animeData,
  isFetching,
  showRank = false,
}: AnimeElementProps) {
  // Filter out duplicate elements
  const uniqueData = animeData.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  return (
    <div
      className={`transition-opacity duration-500 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}
    >
      {animeData &&
        uniqueData.map((anime: Anime) => {
          return (
            <div key={anime.mal_id}>
              {showRank && (anime?.rank ?? "N/A")}
              <h2>{anime.title}</h2>
            </div>
          );
        })}
    </div>
  );
}
