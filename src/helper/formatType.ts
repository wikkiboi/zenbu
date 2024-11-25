import { AnimeType } from "../api/types";

export const formatType = (type: AnimeType): string => {
  if (["tv", "ova", "ona", "cm", "pv"].includes(type)) {
    return type.toUpperCase();
  } else if (["special", "movie", "music"].includes(type)) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  } else {
    return "TV Special";
  }
};
