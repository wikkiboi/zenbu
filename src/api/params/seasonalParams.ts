import { getCurrentDate } from "../../helper/getCurrentDate";
import { Seasons } from "../../types/types";

export const seasonalParams = (search: Record<string, unknown>) => {
  const { year, season } = getCurrentDate();
  return {
    year: search.year ? Number(search.year) : year,
    season: search.season ? (search.season as Seasons) : season,
    page: search.page ? Number(search.page) : undefined,
  };
};
