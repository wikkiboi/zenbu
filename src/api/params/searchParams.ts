import { isValidDate } from "../../helper/isValidDate";
import {
  SearchParams,
  AnimeType,
  AnimeStatus,
  AnimeRating,
  OrderBy,
} from "../types/types";

export const searchParams = (search: Record<string, unknown>): SearchParams => {
  const {
    page,
    limit,
    q,
    type,
    score,
    min_score,
    max_score,
    status,
    rating,
    sfw,
    genres,
    genres_exclude,
    order_by,
    sort,
    producers,
    start_date,
    end_date,
  } = search;

  return {
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    q: q ? String(q) : undefined,
    type: type as AnimeType,
    score: score ? Number(score) : undefined,
    min_score: min_score ? Number(min_score) : undefined,
    max_score: max_score ? Number(max_score) : undefined,
    status: status as AnimeStatus,
    rating: rating as AnimeRating,
    sfw: sfw ? Boolean(sfw) : undefined,
    genres: genres ? String(genres) : undefined,
    genres_exclude: genres_exclude ? String(genres_exclude) : undefined,
    order_by: order_by as OrderBy,
    sort: sort as "desc" | "asc",
    producers: producers ? String(producers) : undefined,
    start_date: isValidDate(start_date) ? String(start_date) : undefined,
    end_date: isValidDate(end_date) ? String(end_date) : undefined,
  };
};
