import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetchTopAnime";
import { useState } from "react";
import { TopAnimeFilter } from "../../api/types/types";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/PageButtons";
import ListSkeleton from "../../components/ListSkeleton";
import RankingFilter from "./RankingFilter";

export default function AnimeList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TopAnimeFilter | undefined>(undefined);
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
        <RankingFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
        />
        {animeData && (
          <AnimeElements animeData={animeData} isFetching={isFetching} />
        )}
        {pagination && (
          <PageButtons pagination={pagination} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
}
