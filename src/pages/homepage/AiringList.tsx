import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetchTopAnime";
import { useState } from "react";
import { AnimeType } from "../../api/types/types";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/PageButtons";
import ListSkeleton from "../../components/ListSkeleton";
import TypeButtons from "../../components/TypeButtons";

export default function AiringList() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<AnimeType>("tv");

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["topAnime", "airing", type, page],
    queryFn: () => fetchTopAnime("airing", type, page),
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
        <TypeButtons type={type} setType={setType} setPage={setPage} />
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
