import axios from "axios";

export const fetchSeasonList = async () => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/seasons");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.status);
  }
};
