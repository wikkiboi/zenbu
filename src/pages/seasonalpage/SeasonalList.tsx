import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SeasonalParams } from "./SeasonalPage";
import { fetchSeasonalAnime } from "../../api/fetch";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/PageButtons";
import ButtonRow from "../../layout/ButtonRow";
import ListLayout from "../../layout/ListLayout";
import ButtonRowSkeleton from "../../components/ButtonRowSkeleton";
import LoadingBar from "../../components/LoadingBar";

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

  if (error instanceof Error && !isFetching)
    return <div>Error: {error.message}</div>;

  const pagination = data?.pagination;
  const animeData = data?.data;

  return (
    <>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      <div className="flex flex-col">
        <ButtonRow>
          {pagination && <PageButtons pagination={pagination} />}
        </ButtonRow>
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
