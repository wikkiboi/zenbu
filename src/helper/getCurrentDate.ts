import { Seasons } from "../api/types";

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  let season: Seasons;
  if (month >= 3 && month < 6) {
    season = "spring";
  } else if (month >= 6 && month < 9) {
    season = "summer";
  } else if (month >= 9 && month < 12) {
    season = "fall";
  } else {
    season = "winter";
  }

  return { year, season };
};
