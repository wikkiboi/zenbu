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
    <>
      <AiringList page={page} type={type} />
    </>
  );
}
