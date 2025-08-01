import { TopRankingFilters } from "../../pages/ranking/modules/ranking-list";

export const rankingParams = (search: Record<string, unknown>) => {
  return {
    filter: search.filter as TopRankingFilters,
    page: search.page ? Number(search.page) : undefined,
  };
};
