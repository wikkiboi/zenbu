import axios from "axios";
import { AnimeData } from "../../types/types";
export const fetchSeasonalAnime = async (
  year: number,
  season: string,
  page?: number
) => {
  try {
    const response = await axios.get<AnimeData>(
      `https://api.jikan.moe/v4/seasons/${year}/${season}`,
      { params: { page } }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.status);
  }
};
