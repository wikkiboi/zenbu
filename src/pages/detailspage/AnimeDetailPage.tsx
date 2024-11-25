import { getRouteApi } from "@tanstack/react-router";

const animeRouteApi = getRouteApi("/anime/$animeId");
export default function AnimeDetailPage() {
  const { animeId } = animeRouteApi.useParams();

  return <div>Hi {animeId}</div>;
}
