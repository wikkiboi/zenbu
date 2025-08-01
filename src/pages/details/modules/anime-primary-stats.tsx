import { StarIcon } from "lucide-react";
import { Anime } from "../../../types";
import { Link } from "@tanstack/react-router";

interface AnimePrimaryStatsProps {
  animeData: Anime;
}

export default function AnimePrimaryStats({
  animeData,
}: AnimePrimaryStatsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:self-start sm:p-2 sm:bg-base-100 rounded gap-2 w-full">
      <div className="flex flex-col max-sm:items-end max-sm:border-transparent border-r border-zinc-400 text-center sm:p-0.5 sm:px-3">
        <h2 className="text-lg leading-6 lg:text-xl">Score</h2>
        <h3 className="flex flex-row items-center justify-center sm:pr-1.5 text-xl lg:text-3xl font-bold leading-6 lg:leading-6 lg:mb-2">
          {animeData.score ? (
            <>
              <StarIcon className="size-3" />
              <span>{animeData.score}</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </h3>
        <p className="hidden md:block text-[9px] lg:text-xs">
          {animeData.scored_by ? animeData.scored_by.toLocaleString() : "-"}{" "}
          ratings
        </p>
      </div>
      <div className="sm:flex flex-col items-center gap-4 sm:bg-base-100 md:text-lg md:pt-2 lg:text-2xl lg:gap-3">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 lg:gap-4 px-1">
          <h2 className="max-sm:flex flex-col">
            <span className="ml-auto max-sm:mr-0 mr-1">Ranked</span>
            <span className="ml-auto max-md:text-sm">
              {animeData.rank ? `#${animeData.rank.toLocaleString()}` : "N/A"}
            </span>
          </h2>
          <h2 className="max-sm:flex flex-col">
            <span className="ml-auto max-sm:mr-0 mr-1">Popularity</span>
            <span className="ml-auto max-md:text-sm">
              {animeData.popularity
                ? `#${animeData.popularity.toLocaleString()}`
                : "N/A"}
            </span>
          </h2>
          <h2 className="max-sm:flex flex-col">
            <span className="ml-auto max-sm:mr-0 mr-1">Members</span>
            <span className="ml-auto max-md:text-sm">
              {animeData.members.toLocaleString()}
            </span>
          </h2>
          <h2 className="hidden max-sm:flex flex-col items-end">
            Status
            <span className="ml-auto max-md:text-sm">
              {animeData.status === "Currently Airing"
                ? "Airing"
                : animeData.status.toLocaleString()}
            </span>
          </h2>
        </div>

        {/* Secondary Statistics */}
        <div className="flex flex-row justify-center items-center gap-6 text-xs max-sm:hidden lg:text-lg">
          {animeData.season && animeData.year && (
            <Link className="px-3 border-r">
              {animeData.season.charAt(0).toUpperCase() +
                animeData.season.slice(1).toLowerCase()}{" "}
              {animeData.year}
            </Link>
          )}
          <p className="px-0">{animeData.type}</p>
          <p className="px-3 border-l">
            {animeData.studios.map((studio) => studio.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
