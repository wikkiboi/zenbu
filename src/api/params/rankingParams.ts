import { TopRankingFilters } from "../../pages/rankingpage/RankingList";

export const rankingParams = (search: Record<string, unknown>) => {
  return {
    filter: search.filter as TopRankingFilters,
    page: search.page ? Number(search.page) : undefined,
  };
};
