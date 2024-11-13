import axios from "axios";
import { AnimeData } from "./types/types";
export const fetchSeasonalAnime = async (year: number, season: string) => {
  try {
    const response = await axios.get<AnimeData>(
      `https://api.jikan.moe/v4/seasons/${year}/${season}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.status);
  }
};
