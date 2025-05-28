import { Link } from "@tanstack/react-router";
import { TopRankingFilters } from "./RankingList";
import { formatFilter } from "../../helper/formatFilter";
import arrowIcon from "../../svg/dropdown-arrow.svg";
import filterIcon from "../../svg/filter-button.svg";
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
    <div className="dropdown z-10 ml-3">
      <div tabIndex={0} className="btn btn-sm hidden md:flex">
        {filter ? formatFilter(filter) : "Score"}
        <img src={arrowIcon} alt="Arrow Icon" className="w-4 invert" />
      </div>
      <div tabIndex={0} className="btn btn-sm rounded-xl md:hidden p-2">
        <img src={filterIcon} alt="Filter Icon" className="w-4 invert" />
      </div>
      <div className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 mt-1 shadow-md">
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
