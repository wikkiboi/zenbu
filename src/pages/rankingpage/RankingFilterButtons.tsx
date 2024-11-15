import { Link } from "@tanstack/react-router";
import { TopRankingFilters } from "./RankingList";
import { formatFilter } from "../../helper/formatFilter";

interface RankingFilterProps {
  filter: TopRankingFilters | undefined;
}

const rankingFilters: (TopRankingFilters | "rank")[] = [
  "bypopularity",
  "favorite",
  "rank",
];

export default function RankingFilterButtons({ filter }: RankingFilterProps) {
  return (
    <div className="dropdown dropdown-hover">
      <div className="btn">{filter ? formatFilter(filter) : "Rank"}</div>
      <div className="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 p-2">
        {rankingFilters.map((filter) => (
          <Link to="." search={() => ({ filter, page: 1 })}>
            {formatFilter(filter)}
          </Link>
        ))}
      </div>
    </div>
  );
}
