import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetch";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/pagination/PageButtons";
import RankingFilterButtons from "./RankingFilterButtons";
import { RankingParams } from "./RankingPage";
import ListLayout from "../../layout/ListLayout";
import ButtonRow from "../../layout/ButtonRow";
import LoadingBar from "../../components/LoadingBar";
import ButtonRowSkeleton from "../../components/ButtonRowSkeleton";
import { toast } from "sonner";

export type TopRankingFilters = "bypopularity" | "favorite";

export default function RankingList({ filter, page }: RankingParams) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["topAnime", filter, page],
    queryFn: () => fetchTopAnime(filter, undefined, page),
    placeholderData: keepPreviousData,
    select: (response) => {
      if (!response || !Array.isArray(response.data)) return response;
      const sortedData = [...response.data].sort((a, b) => {
        if (!a.rank) return 1;
        if (!b.rank) return -1;
        return a.rank - b.rank;
      });
      return { ...response, data: sortedData };
    },
    enabled: true,
    retryDelay: 1500,
    refetchOnReconnect: true,
    staleTime: 60 * 2000,
  });

  if (error instanceof Error && !isFetching) {
    toast.error("Error fetching ranking list");
  }

  const pagination = data?.pagination;
  const animeData = data?.data;

  return (
    <>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      <div className="flex flex-col">
        {pagination ? (
          <ButtonRow>
            <RankingFilterButtons filter={filter} />
            {pagination && <PageButtons pagination={pagination} />}
          </ButtonRow>
        ) : (
          <ButtonRowSkeleton />
        )}
        <ListLayout isFetching={isFetching}>
          <AnimeElements
            animeData={animeData}
            isLoading={isLoading}
            showRank={true}
          />
        </ListLayout>
        {pagination ? (
          <ButtonRow>
            {pagination && <PageButtons pagination={pagination} />}
          </ButtonRow>
        ) : (
          <ButtonRowSkeleton />
        )}
      </div>
    </>
  );
}
