import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import SeasonFilterButton from "./season-filter-button";
import YearFilterButton from "./year-filter-button";
import { fetchSeasonalAnime } from "../../../api/fetch";
import AnimeElements from "../../../components/anime-elements";
import ButtonRowSkeleton from "../../../components/ButtonRowSkeleton";
import LoadingBar from "../../../components/loading-bar";
import PageButtons from "../../../components/pagination/page-buttons";
import ButtonRow from "../../../layout/ButtonRow";
import ListLayout from "../../../layout/ListLayout";
import { SeasonalParams } from "../SeasonalPage";

export default function SeasonalList({ year, season, page }: SeasonalParams) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["seasonalAnime", year, season, page],
    queryFn: () => fetchSeasonalAnime(year, season, page),
    placeholderData: keepPreviousData,
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 2,
  });

  if (error instanceof Error && !isFetching) {
    toast.error("Error fetching this season's list");
    console.log(error.message);
  }

  const pagination = data?.pagination;
  const animeData = data?.data;

  return (
    <>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      <div className="flex flex-col">
        {pagination ? (
          <ButtonRow>
            <div className="max-sm:hidden ml-3">
              <SeasonFilterButton />
            </div>
            <div className="max-sm:hidden">
              <YearFilterButton />
            </div>
            <PageButtons pagination={pagination} />
          </ButtonRow>
        ) : (
          <ButtonRowSkeleton />
        )}
        <div className="flex justify-center mb-2 sm:hidden">
          <SeasonFilterButton />
          <YearFilterButton />
        </div>
        <ListLayout isFetching={isFetching}>
          <AnimeElements animeData={animeData} isLoading={isLoading} />
        </ListLayout>
        <ButtonRow>
          {pagination ? (
            <PageButtons pagination={pagination} />
          ) : (
            <ButtonRowSkeleton />
          )}
        </ButtonRow>
      </div>
    </>
  );
}
