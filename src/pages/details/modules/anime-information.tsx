import { Anime } from "../../../types";

interface AnimeInformationProps {
  animeData: Anime;
}

export default function AnimeInformation({ animeData }: AnimeInformationProps) {
  return (
    <>
      <div className="flex sm:justify-center gap-6 mb-4">
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex flex-col">
            <span className="text-zinc-400">Broadcast</span>
            <span>{animeData.broadcast.string}</span>{" "}
          </p>
          <p className="flex flex-col">
            <span className="text-zinc-400">Aired from</span>
            <span>{animeData.aired.string}</span>
          </p>
          <p className="flex flex-col">
            <span className="text-zinc-400">Duration</span>
            <span>{animeData.duration ? animeData.duration : "Unknown"}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="flex flex-col">
            <span className="text-zinc-400">Genres</span>
            <span>
              {animeData.genres.map((genre) => genre.name).join(", ")}
            </span>
          </p>
          <p className="flex flex-col">
            <span className="text-zinc-400">Rating</span>
            <span>{animeData.rating?.split(" - ")[0] ?? "N/A"}</span>
          </p>
          <p className="flex flex-col">
            <span className="text-zinc-400">Licensor</span>
            {animeData.licensors.length > 0 ? (
              <span>
                {animeData.licensors
                  .map((licensor) => licensor.name)
                  .join(", ")}
              </span>
            ) : (
              <span>Unknown</span>
            )}
          </p>
        </div>
      </div>

      <p className="flex flex-col text-sm">
        <span className="text-zinc-400">Producers</span>
        <span>
          {animeData.producers.map((producer) => producer.name).join(", ")}
        </span>
      </p>
    </>
  );
}
