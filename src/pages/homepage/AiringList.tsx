import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTopAnime } from "../../api/fetch";
import AnimeElements from "../../components/AnimeElements";
import PageButtons from "../../components/pagination/PageButtons";
import TypeButtons from "../../components/TypeButtons";
import { HomeParams } from "./Homepage";
import ButtonRow from "../../layout/ButtonRow";
import ListLayout from "../../layout/ListLayout";
import LoadingBar from "../../components/LoadingBar";
import ButtonRowSkeleton from "../../components/ButtonRowSkeleton";
import { toast } from "sonner";

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

  if (error instanceof Error && !isFetching) {
    toast.error("Error fetching data from API");
  }

  const pagination = data?.pagination;
  const animeData = data?.data;

  return (
    <>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      <div className="flex flex-col">
        {pagination ? (
          <ButtonRow>
            <TypeButtons type={type || "tv"} />
            {pagination && <PageButtons pagination={pagination} />}
          </ButtonRow>
        ) : (
          <ButtonRowSkeleton />
        )}
        <ListLayout isFetching={isFetching} key={pagination?.current_page}>
          <AnimeElements
            animeData={animeData}
            isLoading={isLoading}
            elementCount={pagination?.items.count}
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
