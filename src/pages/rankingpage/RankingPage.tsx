import { getRouteApi } from "@tanstack/react-router";
import RankingList, { TopRankingFilters } from "./RankingList";

export type RankingParams = {
  filter?: TopRankingFilters;
  page?: number;
};

const rankingRouteApi = getRouteApi("/ranking");

export default function RankingPage() {
  const { filter, page }: RankingParams = rankingRouteApi.useSearch();

  return (
    <>
      <RankingList filter={filter} page={page} />
    </>
  );
}
