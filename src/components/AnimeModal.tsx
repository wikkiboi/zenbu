import { Anime } from "../api/types";

interface AnimeModalProps {
  anime: Anime;
}

export default function AnimeModal({ anime }: AnimeModalProps) {
  return (
    <>
      <div className="modal-box bg-neutral p-4">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-neutral border-none shadow-none">
            ✕
          </button>
        </form>
        <h1 className="font-extrabold text-lg mb-1">{anime.title}</h1>
        <div className="bg-base-100 flex rounded-lg p-3 gap-2 mb-1">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className="w-1/3 rounded object-fit aspect-[7/10]"
          />
          <div className="">
            <p>Score: {anime.score || "N/A"}</p>
            <p>
              Ranked: {anime.rank ? `#${anime.rank.toLocaleString()}` : "N/A"}
            </p>
            <p>
              Popularity:{" "}
              {anime.popularity
                ? `#${anime.popularity.toLocaleString()}`
                : "N/A"}
            </p>
            <p>Members: {anime.members.toLocaleString()}</p>
            {anime.season && anime.year && (
              <p>
                {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)}{" "}
                {anime.year}
              </p>
            )}
            <p>{anime.source}</p>
          </div>
        </div>
        <div className="bg-base-100 rounded-lg py-2 px-4">
          <h2 className="font-bold text-lg">Synopsis</h2>
          <p>{anime.synopsis}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default" aria-hidden="true">
          close
        </button>
      </form>
    </>
  );
}
