import { Link } from "@tanstack/react-router";
import { TopRankingFilters } from "./RankingList";
import { formatFilter } from "../../helper/formatFilter";
import arrowIcon from "../../../public/svg/dropdown-arrow.svg";
interface RankingFilterProps {
  filter: TopRankingFilters | undefined;
}

const rankingFilters: (TopRankingFilters | "score")[] = [
  "bypopularity",
  "favorite",
  "score",
];

export default function RankingFilterButtons({ filter }: RankingFilterProps) {
  return (
    <div className="dropdown dropdown-hover">
      <div className="btn btn-sm">
        {filter ? formatFilter(filter) : "Score"}
        <img
          src={arrowIcon}
          alt="Arrow Icon"
          className="w-4 font-bold invert"
        />
      </div>
      <div className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2">
        {rankingFilters.map((filter) => {
          if (filter === "score") {
            return (
              <Link
                to="."
                className="btn btn-ghost"
                key={filter}
                search={() => ({ filter: undefined, page: 1 })}
              >
                {formatFilter(filter)}
              </Link>
            );
          } else {
            return (
              <Link
                to="."
                className="btn btn-ghost"
                key={filter}
                search={() => ({ filter, page: 1 })}
              >
                {formatFilter(filter)}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
