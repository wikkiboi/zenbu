import { getRouteApi } from "@tanstack/react-router";
import SeasonalList from "./modules/seasonal-list";
import { Seasons } from "../../types";

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
      <h1 className="mx-auto text-4xl font-bold p-1 cursor-default max-xs:mb-4">
        Top Seasonal
      </h1>
      {year && season && (
        <h2 className="text-lg mx-auto max-xs:hidden capitalize">
          {season} {year}
        </h2>
      )}
      <SeasonalList year={year} season={season} page={page} />
    </div>
  );
}
