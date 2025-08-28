import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { fetchAnime } from "../../api/fetch/fetchAnime";
import { toast } from "sonner";
import { Suspense, useEffect, useState } from "react";
import { scrollToTop } from "../../helper";
import LoadingBar from "../../components/loading-bar";
import Synopsis from "../../components/anime-synopsis";
import AnimePrimaryStats from "./modules/anime-primary-stats";
import AnimeExternalLinks from "./modules/anime-external-links";
import AnimeRelatedEntries from "./modules/anime-related-entries";
import AnimeInformation from "./modules/anime-information";
import TrailerModalButton from "./modules/trailer/trailer-modal-button";
import TrailerDialog from "./modules/trailer/trailer-dialog";

const animeRouteApi = getRouteApi("/anime/$animeId");

export default function AnimeDetailPage() {
  const { animeId } = animeRouteApi.useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(animeId);
  const [, setIsTrailerOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

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
    <>
      <Suspense fallback={<div className="skeleton"></div>}>
        <LoadingBar isLoading={isLoading} isFetching={isFetching} />
        {animeData && (
          <div className="max-w-screen-lg mx-auto">
            <div className="w-full mb-3">
              <h1 className="font-bold text-2xl lg:text-3xl hidden md:block mb-3">
                {animeData.title}
              </h1>
              <div className="flex gap-4 sm:gap-2">
                <div className="flex-shrink-0 w-3/5 sm:w-1/3">
                  <img
                    src={animeData.images.webp.large_image_url}
                    className="rounded"
                  />
                </div>

                <div className="flex flex-col max-sm:flex-1 max-sm:items-end gap-2">
                  <AnimePrimaryStats animeData={animeData} />
                  <div className="flex flex-1 w-full items-center max-xs:hidden">
                    <AnimeExternalLinks animeData={animeData} />
                    <div className="max-sm:hidden">
                      <TrailerModalButton
                        animeData={animeData}
                        setIsOpen={setIsTrailerOpen}
                        setTrailerUrl={setTrailerUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>

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
                <div className="flex flex-row bg-base-100 justify-center rounded gap-8 text-xs py-1 mb-1 sm:hidden">
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
                <div className="xs:hidden">
                  <AnimeExternalLinks animeData={animeData} />
                </div>
              </div>
            </div>
            <section className="rounded bg-base-100 p-2 mb-4">
              <Synopsis
                synopsis={animeData.synopsis ?? "No synopsis available"}
              />
            </section>
            <div className="mb-4">
              <AnimeInformation animeData={animeData} />
            </div>
            <AnimeRelatedEntries animeData={animeData} />
          </div>
        )}
      </Suspense>
      <TrailerDialog
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        setIsOpen={setIsTrailerOpen}
      />
    </>
  );
}
