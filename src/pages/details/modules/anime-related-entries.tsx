import { ChevronUp, ChevronDown } from "lucide-react";
import pluralize from "pluralize";
import { useState } from "react";
import { Anime, KeyRelation } from "../../../types";
import { Link } from "@tanstack/react-router";
import { scrollToTop } from "../../../helper";

interface AnimeRelatedEntriesProps {
  animeData: Anime;
}

const isKeyRelation = (relation: string): relation is KeyRelation =>
  ["Adaptation", "Prequel", "Sequel"].includes(relation as KeyRelation);

export default function AnimeRelatedEntries({
  animeData,
}: AnimeRelatedEntriesProps) {
  const [expandedRelations, setExpandedRelations] = useState(false);

  return (
    <section className="bg-base-100 rounded p-2">
      <h1 className="font-bold mb-1">Related Entries</h1>
      {animeData.relations &&
        animeData.relations.map((relation) => {
          if (isKeyRelation(relation.relation)) {
            return (
              <ul key={relation.relation + relation.entry} className="text-sm">
                {relation.entry.map((entry) => {
                  return (
                    <li className="flex flex-col mb-1" key={entry.mal_id}>
                      <h3 className="text-zinc-400">{relation.relation}</h3>
                      {entry.type == "anime" ? (
                        <>
                          <Link
                            onClick={() => scrollToTop("instant")}
                            to={`../${entry.mal_id}`}
                            className="text-blue-400 text-xs hover:underline"
                          >
                            {entry.name}
                          </Link>
                        </>
                      ) : (
                        <span className="text-xs">
                          {entry.type
                            ? `${entry.name} (${
                                entry.type.charAt(0).toUpperCase() +
                                entry.type.slice(1)
                              })`
                            : entry.name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          }

          return (
            <ul
              className={`${!expandedRelations && "hidden"}`}
              key={relation.relation + relation.entry}
            >
              <h3 className="text-zinc-400 text-sm mt-2">
                {pluralize(relation.relation)}{" "}
              </h3>
              {relation.entry.map((entry) => {
                const isAnime = entry.type == "anime";
                return (
                  <li
                    className="flex flex-row text-xs mb-1 gap-2"
                    key={entry.mal_id}
                  >
                    {isAnime ? (
                      <>
                        <Link
                          to={`../${entry.mal_id}`}
                          className="text-blue-400 truncate hover:underline"
                        >
                          {entry.name}
                        </Link>
                      </>
                    ) : (
                      <span>
                        {entry.type
                          ? `${entry.name} (${entry.type})`
                          : entry.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          );
        })}
      {animeData.relations?.some((r) => !isKeyRelation(r.relation)) && (
        <button
          onClick={() => setExpandedRelations(!expandedRelations)}
          className="text-primary  flex justify-center w-full md:hidden hover:bg-base-200 transition-colors rounded"
        >
          {expandedRelations ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </button>
      )}
    </section>
  );
}
