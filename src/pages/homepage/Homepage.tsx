import AiringList from "./AiringList";
import { AnimeType } from "../../api/types";
import { getRouteApi } from "@tanstack/react-router";

export type HomeParams = {
  page?: number;
  type?: AnimeType;
};

const homeRouteApi = getRouteApi("/");

export default function Homepage() {
  const { page, type }: HomeParams = homeRouteApi.useSearch();
  return (
    <div className="flex flex-col">
      <h1 className="mx-auto text-4xl font-bold p-1 mb-4 cursor-default">
        Currently Airing
      </h1>
      <AiringList page={page} type={type} />
    </div>
  );
}
