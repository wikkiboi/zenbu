import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetch/fetchTopAnime";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/PageButtons";
import ListSkeleton from "../../components/ListSkeleton";
import TypeButtons from "../../components/TypeButtons";
import { HomeParams } from "./Homepage";

export default function AiringList({ page, type }: HomeParams) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["topAnime", "airing", type || "tv", page || 1],
    queryFn: () => fetchTopAnime("airing", type || "tv", page || 1),
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
        <TypeButtons type={type || "tv"} />
        {animeData && (
          <AnimeElements animeData={animeData} isFetching={isFetching} />
        )}
        {pagination && <PageButtons pagination={pagination} />}
      </div>
    </>
  );
}
