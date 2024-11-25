import { getRouteApi } from "@tanstack/react-router";
import SeasonalList from "./SeasonalList";
import { Seasons } from "../../api/types";

export type SeasonalParams = {
  year: number;
  season: Seasons;
  page?: number;
};

const seasonalRouteApi = getRouteApi("/seasonal");

export default function SeasonalPage() {
  const { year, season, page }: SeasonalParams = seasonalRouteApi.useSearch();
  return (
    <>
      <SeasonalList year={year} season={season} page={page} />
    </>
  );
}
