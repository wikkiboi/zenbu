import axios from "axios";
import { TopAnimeFilter, AnimeType, AnimeData } from "../../types/types";

export const fetchTopAnime = async (
  filter?: TopAnimeFilter,
  type?: AnimeType,
  page = 1,
  sfw = true
): Promise<AnimeData | undefined> => {
  try {
    const response = await axios.get<AnimeData>(
      "https://api.jikan.moe/v4/top/anime",
      {
        params: { filter, type, page, sfw },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
    }
  }
};
