import { Link } from "@tanstack/react-router";
import { Anime } from "../api/types";
import { Link as LinkIcon } from "lucide-react";
import Synopsis from "./anime-synopsis";

interface AnimeModalProps {
  anime: Anime;
}

export default function AnimeModal({ anime }: AnimeModalProps) {
  return (
    <>
      <div className="modal-box bg-neutral p-4">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none shadow-none">
            ✕
          </button>
        </form>

        <Link
          to={`/anime/${anime.mal_id}`}
          className="inline-block hover:underline ml-1 z-1"
        >
          <h1 className="inline-block text-lg font-extrabold hover:underline">
            {anime.title}
            <span className="inline-block w-[1em] h-[1em] ml-1 align-text-bottom">
              <LinkIcon className="size-3.5" />
            </span>
          </h1>
        </Link>
        <div className="bg-base-100 flex rounded-lg p-3 gap-2 my-1">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className="w-1/3 rounded object-cover aspect-[7/10] max-h-[250px]"
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
                First Aired:{" "}
                {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)}{" "}
                {anime.year}
              </p>
            )}
            <p>Source: {anime.source}</p>
          </div>
        </div>
        <div className="bg-base-100 rounded-lg py-2 px-4">
          <Synopsis synopsis={anime.synopsis ?? "No synopsis available"} />
        </div>
        <div className="mt-3 text-right">
          <Link
            to={`/anime/${anime.mal_id}`}
            className="btn btn-sm btn-primary"
          >
            View Full Details
          </Link>
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
