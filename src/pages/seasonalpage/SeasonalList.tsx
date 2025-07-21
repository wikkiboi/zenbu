import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SeasonalParams } from "./SeasonalPage";
import { fetchSeasonalAnime } from "../../api/fetch";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/pagination/PageButtons";
import ButtonRow from "../../layout/ButtonRow";
import ListLayout from "../../layout/ListLayout";
import ButtonRowSkeleton from "../../components/ButtonRowSkeleton";
import LoadingBar from "../../components/LoadingBar";
import { toast } from "sonner";

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
            <PageButtons pagination={pagination} />
          </ButtonRow>
        ) : (
          <ButtonRowSkeleton />
        )}
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
