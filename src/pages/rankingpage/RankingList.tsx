import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetch/fetchTopAnime";
import { useState } from "react";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/PageButtons";
import ListSkeleton from "../../components/ListSkeleton";
import RankingFilterButtons from "./RankingFilterButtons";
import { RankingParams } from "./RankingPage";

export type TopRankingFilters = "bypopularity" | "favorite";

export default function RankingList({ filter, page }: RankingParams) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["topAnime", filter, page],
    queryFn: () => fetchTopAnime(filter, undefined, page),
    placeholderData: keepPreviousData,
    select: (response) => response,
    enabled: true,
    retryDelay: 1500,
    refetchOnReconnect: true,
    staleTime: 60 * 2000,
  });

  if (isLoading) return <ListSkeleton />;
  if (error instanceof Error && !isFetching)
    return <div>Error: {error.message}</div>;

  const pagination = data?.pagination;
  const animeData = data?.data;

  return (
    <>
      <div>
        <RankingFilterButtons filter={filter} />
        {animeData && (
          <AnimeElements
            animeData={animeData}
            isFetching={isFetching}
            showRank={true}
          />
        )}
        {pagination && <PageButtons pagination={pagination} />}
      </div>
    </>
  );
}
