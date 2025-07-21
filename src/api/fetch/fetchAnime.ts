import axios from "axios";
import { Anime } from "../types/types";

export const fetchAnime = async (
  animeId: number
): Promise<Anime | undefined> => {
  try {
    const response = await axios.get<Anime>(
      `https://api.jikan.moe/v4/anime/${animeId}/full`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
    }
  }
};
