import { AnimeType } from "../api/types/types";

interface TypeButtonProps {
  type: AnimeType;
  setType: React.Dispatch<React.SetStateAction<AnimeType>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const animeTypes: AnimeType[] = [
  "tv",
  "movie",
  "ova",
  "special",
  "ona",
  "music",
  "cm",
  "pv",
  "tv_special",
];

function formatType(type: AnimeType): string {
  if (["tv", "ova", "ona", "cm", "pv"].includes(type)) {
    return type.toUpperCase();
  } else if (["special", "movie", "music"].includes(type)) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  } else {
    return "TV Special";
  }
}
export default function TypeButtons({
  type,
  setType,
  setPage,
}: TypeButtonProps) {
  function handleType(type: AnimeType) {
    setType(type);
    setPage(1);
  }

  return (
    <div className="dropdown dropdown-hover">
      <div className="btn">{formatType(type)}</div>
      <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 p-2">
        {animeTypes.map((type) => (
          <button
            className="btn btn-ghost"
            key={type}
            onClick={() => handleType(type)}
          >
            {formatType(type)}
          </button>
        ))}
      </div>
    </div>
  );
}
