import { TopRankingFilters } from "../pages/ranking/modules/ranking-list";

export const formatFilter = (filter: TopRankingFilters | "score"): string => {
  if (filter === "bypopularity") {
    return "By Popularity";
  }
  return filter.charAt(0).toUpperCase() + filter.slice(1);
};
