import { Link } from "@tanstack/react-router";
import { Anime } from "../types";
import { Link as LinkIcon } from "lucide-react";
import Synopsis from "./anime-synopsis";
import { scrollToTop } from "../helper";

interface AnimeModalProps {
  anime: Anime;
}

export default function AnimeModal({ anime }: AnimeModalProps) {
  return (
    <>
      <div className="modal-box bg-neutral p-4 max-w-prose max-sm:pb-2">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none shadow-none">
            ✕
          </button>
        </form>

        <Link
          onClick={() => scrollToTop("instant")}
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
        <div className="bg-base-100 rounded-lg p-3 my-1 mb-2">
          <div className="flex gap-4 mb-1">
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="w-1/3 rounded object-cover"
            />
            <div className="flex-1 flex flex-col text-xl max-sm:text-sm md:text-2xl">
              <div className="border-b border-zinc-500 sm:pb-2 mb-2">
                {anime.title_english && (
                  <span className="flex gap-1 text-base max-sm:text-[9px] leading-5">
                    <span className="text-[10px]">🇬🇧</span>
                    <p className="font-bold">{anime.title_english}</p>
                  </span>
                )}
                {anime.title_japanese && (
                  <span className="flex gap-1 text-base max-sm:text-[8px]">
                    <span className="text-[10px]">🇯🇵</span>
                    <p className="font-bold">{anime.title_japanese}</p>
                  </span>
                )}
              </div>
              <p>
                <span className="font-bold">Score:</span> {anime.score || "N/A"}
              </p>
              <p>
                <span className="font-bold">Ranked:</span>{" "}
                {anime.rank ? `#${anime.rank.toLocaleString()}` : "N/A"}
              </p>
              <p>
                <span className="font-bold">Popularity:</span>{" "}
                {anime.popularity
                  ? `#${anime.popularity.toLocaleString()}`
                  : "N/A"}
              </p>
              <p>
                <span className="font-bold">Members:</span>{" "}
                {anime.members.toLocaleString()}
              </p>
              {anime.season && anime.year && (
                <p>
                  <span className="font-bold">First Aired:</span>{" "}
                  {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)}{" "}
                  {anime.year}
                </p>
              )}
              <p>
                <span className="font-bold">Source:</span> {anime.source}
              </p>
              <div className="max-xs:hidden my-auto">
                <div className="flex-1 flex justify-center gap-6 md:gap-8 sm:text-sm md:text-lg">
                  <p
                    className={`${
                      anime.status === "Not yet aired"
                        ? "opacity-100 text-orange-400"
                        : "opacity-15"
                    }`}
                  >
                    Upcoming
                  </p>
                  <p
                    className={`${
                      anime.status === "Currently Airing"
                        ? "opacity-100 text-green-600"
                        : "opacity-15"
                    }`}
                  >
                    Airing
                  </p>
                  <p
                    className={`${
                      anime.status === "Finished Airing"
                        ? "opacity-100 text-yellow-400"
                        : "opacity-15"
                    }`}
                  >
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="xs:hidden my-auto">
            <div className="flex-1 flex justify-center gap-6">
              <p
                className={`${
                  anime.status === "Not yet aired"
                    ? "opacity-100 text-orange-400"
                    : "opacity-20"
                }`}
              >
                Upcoming
              </p>
              <p
                className={`${
                  anime.status === "Currently Airing"
                    ? "opacity-100 text-green-600"
                    : "opacity-20"
                }`}
              >
                Airing
              </p>
              <p
                className={`${
                  anime.status === "Finished Airing"
                    ? "opacity-100 text-yellow-400"
                    : "opacity-20"
                }`}
              >
                Completed
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-lg py-2 px-4 mb-3">
          <Synopsis synopsis={anime.synopsis ?? "No synopsis available"} />
        </div>
        <div className="text-right">
          <Link
            onClick={() => scrollToTop("instant")}
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
