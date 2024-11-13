import { TopAnimeFilter } from "../../api/types/types";

interface RankingFilterProps {
  filter: TopAnimeFilter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<TopAnimeFilter | undefined>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const rankingFilters: (TopAnimeFilter | "rank")[] = [
  "bypopularity",
  "favorite",
  "rank",
];

function formatFilter(filter: TopAnimeFilter | "rank"): string {
  if (filter === "bypopularity") {
    return "By Popularity";
  }
  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export default function RankingFilter({
  filter,
  setFilter,
  setPage,
}: RankingFilterProps) {
  function handleFilter(filter: TopAnimeFilter | "rank") {
    if (filter === "rank") {
      setFilter(undefined);
      setPage(1);
    } else {
      setFilter(filter);
      setPage(1);
    }
  }

  return (
    <div className="dropdown dropdown-hover">
      <div className="btn">{filter ? formatFilter(filter) : "Rank"}</div>
      <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 p-2">
        {rankingFilters.map((filter) => (
          <button
            className="btn btn-ghost"
            key={filter}
            onClick={() => handleFilter(filter)}
          >
            {formatFilter(filter)}
          </button>
        ))}
      </div>
    </div>
  );
}
