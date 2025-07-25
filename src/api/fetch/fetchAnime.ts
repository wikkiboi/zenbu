import axios from "axios";
import { FullAnimeData } from "../types/types";

export const fetchAnime = async (
  animeId: number
): Promise<FullAnimeData | undefined> => {
  try {
    const response = await axios.get<FullAnimeData>(
      `https://api.jikan.moe/v4/anime/${animeId}/full`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
    }
  }
};
