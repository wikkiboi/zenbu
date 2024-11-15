import AiringList from "./AiringList";
import ShortSearchBar from "../../components/ShortSearchBar";
import { AnimeType } from "../../api/types/types";
import { getRouteApi } from "@tanstack/react-router";

export type HomeParams = {
  page?: number;
  type?: AnimeType;
};

const homeRouteApi = getRouteApi("/");

export default function Homepage() {
  const { page, type } = homeRouteApi.useSearch();
  return (
    <div className="p-4">
      <ShortSearchBar />
      <AiringList page={page} type={type} />
    </div>
  );
}
