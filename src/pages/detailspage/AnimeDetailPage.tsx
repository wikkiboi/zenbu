import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { fetchAnime } from "../../api/fetch/fetchAnime";
import { toast } from "sonner";
import { Suspense, useEffect, useState } from "react";
import LoadingBar from "../../components/LoadingBar";
import { scrollToTop } from "../../helper";
import { KeyRelation } from "../../api/types";
import { ChevronDown, ChevronUp, StarIcon } from "lucide-react";
import Synopsis from "../../components/anime-synopsis";
import pluralize from "pluralize";

const animeRouteApi = getRouteApi("/anime/$animeId");
const isKeyRelation = (relation: string): relation is KeyRelation =>
  ["Adaptation", "Prequel", "Sequel"].includes(relation as KeyRelation);

export default function AnimeDetailPage() {
  const { animeId } = animeRouteApi.useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(animeId);
  const [expandedRelations, setExpandedRelations] = useState(false);

  useEffect(() => {
    if (!parsedId || isNaN(parsedId)) {
      toast.error("Invalid Anime ID");
      navigate({
        to: "/",
      });
      scrollToTop();
    }
  }, [parsedId, navigate]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: () => fetchAnime(parsedId),
    enabled: !!parsedId && !isNaN(parsedId),
    placeholderData: keepPreviousData,
    retryDelay: 1500,
    refetchOnReconnect: true,
    staleTime: 60 * 2000,
  });

  if (isError) {
    toast.error(`Error occurred: ${error}`);
  }

  const animeData = data?.data;

  return (
    <Suspense fallback={<div className="skeleton"></div>}>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      {animeData && (
        <div className="max-w-screen-lg mx-auto">
          <div className="w-full mb-2">
            <h1 className="font-bold text-2xl hidden md:block mb-2">
              {animeData.title}
            </h1>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-3/5 md:w-1/3">
                <img
                  src={animeData.images.webp.large_image_url}
                  className="rounded"
                />
              </div>

              {/* {Anime Primary Statistics} */}
              <div className="flex-1 flex flex-col md:flex-row items-end gap-1">
                <div className="text-center">
                  <h2 className="text-lg">Score</h2>
                  <h3 className="flex flex-row  items-center justify-center text-xl font-bold gap-1">
                    <StarIcon className="size-3" />
                    <span>{animeData.score}</span>
                  </h3>
                  <p className="hidden md:block text-xs">
                    {animeData.scored_by
                      ? animeData.scored_by.toLocaleString()
                      : "-"}{" "}
                    ratings
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row gap-2 items-end">
                    <h2 className="flex flex-col md:block">
                      Ranked
                      <span className="ml-auto">
                        {animeData.rank
                          ? `#${animeData.rank.toLocaleString()}`
                          : "N/A"}
                      </span>
                    </h2>
                    <h2 className="flex flex-col md:block">
                      Popularity{" "}
                      <span className="ml-auto">
                        {animeData.popularity
                          ? `#${animeData.popularity.toLocaleString()}`
                          : "N/A"}
                      </span>
                    </h2>
                    <h2 className="flex flex-col md:block">
                      Members
                      <span className="ml-auto">
                        {animeData.members.toLocaleString()}
                      </span>
                    </h2>
                    <h2 className="flex flex-col items-end md:hidden">
                      Status
                      <span className="ml-auto">
                        {animeData.status === "Currently Airing"
                          ? "Airing"
                          : animeData.status.toLocaleString()}
                      </span>
                    </h2>
                  </div>
                  <div className="md:flex flex-row justify-center gap-2 text-xs hidden">
                    {animeData.season && animeData.year && (
                      <Link>
                        {animeData.season.charAt(0).toUpperCase() +
                          animeData.season.slice(1).toLowerCase()}{" "}
                        {animeData.year}
                      </Link>
                    )}
                    <p>{animeData.type}</p>
                    <p>
                      {animeData.studios
                        .map((studio) => studio.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Anime Title */}
            <div>
              <h1 className="font-bold text-2xl text-center md:hidden p-2">
                {animeData.title}
                {animeData.title_english && (
                  <span className="flex justify-center gap-1 text-xs">
                    <span className="text-[10px]">🇬🇧</span>
                    <p>{animeData.title_english}</p>
                  </span>
                )}
                {animeData.title_japanese && (
                  <span className="flex justify-center gap-1 text-xs">
                    <span className="text-[10px]">🇯🇵</span>
                    <p>{animeData.title_japanese}</p>
                  </span>
                )}
              </h1>

              {/* Anime Secondary Statistics */}
              <div className="flex flex-row bg-base-100 justify-center rounded gap-8 text-xs py-1 mb-1">
                {animeData.season && animeData.year && (
                  <Link>
                    {animeData.season.charAt(0).toUpperCase() +
                      animeData.season.slice(1).toLowerCase()}{" "}
                    {animeData.year}
                  </Link>
                )}
                <p>{animeData.type}</p>
                <p>
                  {animeData.studios.map((studio) => studio.name).join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Anime Synopsis */}
          <section className="rounded bg-base-100 p-2 mb-4">
            <Synopsis
              synopsis={animeData.synopsis ?? "No synopsis available"}
            />
          </section>

          {/* Anime Information */}
          <div className="mb-4">
            <div className="flex gap-6 mb-4">
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
                  <span>
                    {animeData.duration ? animeData.duration : "Unknown"}
                  </span>
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
                {animeData.producers
                  .map((producer) => producer.name)
                  .join(", ")}
              </span>
            </p>
          </div>

          {/* Related Media */}
          <section className="bg-base-100 rounded p-2">
            <h1 className="font-bold mb-1">Related Entries</h1>
            {animeData.relations &&
              animeData.relations.map((relation) => {
                if (isKeyRelation(relation.relation)) {
                  return (
                    <ul key={relation.relation} className="text-sm">
                      {relation.entry.map((entry) => {
                        return (
                          <li className="flex flex-col mb-1" key={entry.mal_id}>
                            <h3 className="text-zinc-400">
                              {relation.relation}
                            </h3>
                            {entry.type == "anime" ? (
                              <>
                                <Link
                                  to={`../${entry.mal_id}`}
                                  className="text-blue-400 hover:underline"
                                >
                                  {entry.name}
                                </Link>
                              </>
                            ) : (
                              <span>
                                {entry.type
                                  ? `${entry.name} (${
                                      entry.type.charAt(0).toUpperCase() +
                                      entry.type.slice(1)
                                    })`
                                  : entry.name}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return (
                  <ul className={`${!expandedRelations && "hidden"}`}>
                    <h3 className="text-zinc-400 text-sm">
                      {pluralize(relation.relation)}{" "}
                    </h3>
                    {relation.entry.map((entry) => {
                      const isAnime = entry.type == "anime";
                      return (
                        <li
                          className="flex flex-row text-xs mb-1 gap-2"
                          key={entry.mal_id}
                        >
                          {isAnime ? (
                            <>
                              <Link
                                to={`../${entry.mal_id}`}
                                className="text-blue-400 truncate hover:underline"
                              >
                                {entry.name}
                              </Link>
                            </>
                          ) : (
                            <span>
                              {entry.type
                                ? `${entry.name} (${entry.type})`
                                : entry.name}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            {animeData.relations?.some((r) => !isKeyRelation(r.relation)) && (
              <button
                onClick={() => setExpandedRelations(!expandedRelations)}
                className="text-primary md:hidden flex justify-center w-full"
              >
                {expandedRelations ? (
                  <ChevronUp className="size-6" />
                ) : (
                  <ChevronDown className="size-6" />
                )}
              </button>
            )}
          </section>
        </div>
      )}
    </Suspense>
  );
}
