import axios from "axios";
import { AnimeData, SearchParams } from "../../types/types";

export const fetchSearchAnime = async (
  params: SearchParams
): Promise<AnimeData | undefined> => {
  try {
    const response = await axios.get<AnimeData>(
      "https://api.jikan.moe/v4/anime",
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
    }
  }
};
