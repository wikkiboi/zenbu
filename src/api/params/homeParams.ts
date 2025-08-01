import { HomeParams } from "../../pages/home/Homepage";
import { AnimeType } from "../../types/types";

export const homeParams = (search: Record<string, unknown>): HomeParams => {
  return {
    page: search.page ? Number(search.page) : undefined,
    type: search.type as AnimeType,
  };
};
