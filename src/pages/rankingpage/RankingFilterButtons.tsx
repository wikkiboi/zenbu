import { Link } from "@tanstack/react-router";
import { TopRankingFilters } from "./RankingList";
import { formatFilter } from "../../helper/formatFilter";
import arrowIcon from "../../svg/dropdown-arrow.svg";
import filterIcon from "../../svg/filter-button.svg";
import { useState, useRef, useEffect } from "react";
interface RankingFilterProps {
  filter: TopRankingFilters | undefined;
}

const rankingFilters: (TopRankingFilters | "score")[] = [
  "bypopularity",
  "favorite",
  "score",
];

export default function RankingFilterButtons({ filter }: RankingFilterProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown z-10 ml-3">
      <button
        tabIndex={0}
        className="btn btn-sm hidden md:flex"
        onClick={() => setOpen(!open)}
      >
        {filter ? formatFilter(filter) : "Score"}
        <img src={arrowIcon} alt="Arrow Icon" className="w-4 invert" />
      </button>
      <div
        tabIndex={0}
        className="btn btn-sm rounded-xl md:hidden p-2"
        onClick={() => setOpen(!open)}
      >
        <img src={filterIcon} alt="Filter Icon" className="w-4 invert" />
      </div>
      {open && (
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
      )}
    </div>
  );
}
