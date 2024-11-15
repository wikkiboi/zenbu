import { Seasons } from "../../pages/seasonalpage/SeasonalList";

export const seasonalParams = (search: Record<string, unknown>) => {
  return {
    year: Number(search?.year),
    season: search?.season as Seasons,
  };
};
