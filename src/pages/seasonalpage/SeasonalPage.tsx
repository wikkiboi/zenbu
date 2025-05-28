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
    <div className="flex flex-col">
      <h1 className="mx-auto text-4xl font-bold p-1 cursor-default">
        Top Seasonal
      </h1>
      {year && season && (
        <h2 className="text-lg mx-auto mb-4">
          {season.charAt(0).toUpperCase() + season.slice(1)} {year}
        </h2>
      )}
      <SeasonalList year={year} season={season} page={page} />
    </div>
  );
}
