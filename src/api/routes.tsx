import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Homepage from "../pages/homepage/Homepage";
import SearchPage from "../pages/searchpage/SearchPage";
import RankingPage from "../pages/rankingpage/RankingPage";
import SeasonalPage from "../pages/seasonalpage/SeasonalPage";
import AnimeDetailPage from "../pages/detailspage/AnimeDetailPage";
import { homeParams } from "./params/homeParams";
import { searchParams } from "./params/searchParams";
import { rankingParams } from "./params/rankingParams";
import { seasonalParams } from "./params/seasonalParams";

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
  validateSearch: homeParams,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
  validateSearch: searchParams,
});

const rankingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ranking",
  component: RankingPage,
  validateSearch: rankingParams,
});

const seasonalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seasonal",
  component: SeasonalPage,
  validateSearch: seasonalParams,
});

const animeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/anime/:animeId",
  component: AnimeDetailPage,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    searchRoute,
    rankingRoute,
    seasonalRoute,
    animeDetailRoute,
  ]),
});

export default router;
