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
    <div className="flex flex-col">
      <h1 className="mx-auto text-4xl font-bold p-1 mb-4 cursor-default">
        Top Rankings
      </h1>
      <RankingList filter={filter} page={page} />
    </div>
  );
}
