import { LinkIcon, Twitter, Globe } from "lucide-react";
import { Anime } from "../../../types";
import myAnimeList from "../../../svg/myanimelist.svg";

interface AnimeExternalLinksProps {
  animeData: Anime;
}

export default function AnimeExternalLinks({
  animeData,
}: AnimeExternalLinksProps) {
  const seenLinks = new Set<string>();

  return (
    <div className="flex flex-col gap-2 max-w-64 p-2">
      <a
        href={animeData.url}
        className="flex group p-3 max-sm:pb-1.5 max-sm:pt-1 bg-base-200 rounded-lg justify-center items-center transition-colors hover:bg-secondary hover:text-secondary-content gap-1"
      >
        <img
          src={myAnimeList}
          alt="My Anime List Icon"
          className="size-4 mt-1 invert group-hover:invert-0 transition"
        />
        <span className="font-bold text-xs">MyAnimeList</span>
      </a>
      {animeData.external.map((link) => {
        if (
          (["O", "@"].includes(link.name.charAt(0)) ||
            link.url.includes("en.wikipedia")) &&
          !seenLinks.has(link.name)
        ) {
          seenLinks.add(link.name);

          return (
            <a
              href={link.url}
              className="flex flex-row gap-1 p-3 max-sm:py-1.5 bg-base-200 rounded-lg justify-center items-center text-xs transition-colors hover:bg-secondary hover:text-secondary-content truncate"
              key={link.url}
            >
              {link.name.includes("Official") && (
                <LinkIcon className="size-3" />
              )}
              {link.name.includes("@") && (
                <Twitter className="size-3 shrink-0" />
              )}
              {link.url.includes("en.wikipedia") && (
                <Globe className="size-3" />
              )}
              <span className="font-bold">{link.name}</span>
            </a>
          );
        }
      })}
    </div>
  );
}
