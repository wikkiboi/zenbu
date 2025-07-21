import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { fetchAnime } from "../../api/fetch/fetchAnime";
import { toast } from "sonner";
import { useEffect } from "react";
import LoadingBar from "../../components/LoadingBar";
import { scrollToTop } from "../../helper";

const animeRouteApi = getRouteApi("/anime/$animeId");
export default function AnimeDetailPage() {
  const { animeId } = animeRouteApi.useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(animeId);

  useEffect(() => {
    if (!parsedId || isNaN(parsedId)) {
      toast.error("Invalid Anime ID");
      navigate({
        to: "/",
      });
    }

    scrollToTop();
  }, [parsedId, navigate]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: () => fetchAnime(parsedId),
    enabled: !!parsedId && !isNaN(parsedId),
    placeholderData: keepPreviousData,
    retryDelay: 1500,
    refetchOnReconnect: true,
    staleTime: 60 * 2000,
  });

  if (isError) {
    toast.error(`Error occurred: ${error}`);
  }

  return (
    <div>
      <LoadingBar isLoading={isLoading} isFetching={isFetching} />
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

// function AlternativeTitles({ synonyms, japanese, english }) {
//   return (
//     <div className="alternative-titles">
//       <h3>Alternative Titles</h3>
//       {synonyms && <p>Synonyms: {synonyms.join(", ")}</p>}
//       {japanese && <p>Japanese: {japanese}</p>}
//       {english && <p>English: {english}</p>}
//     </div>
//   );
// }

// export default function AnimeInformation({
//   type,
//   status,
//   broadcast,
//   producers,
//   studios,
//   genres,
//   demographics,
//   duration,
//   rating,
// }) {
//   return (
//     <div className="anime-information">
//       <h3>Information</h3>
//       <p>Type: {type}</p>
//       <p>Status: {status}</p>
//       <p>Broadcast: {broadcast.string}</p>
//       <p>Producers: {producers.map((producer) => producer.name).join(", ")}</p>
//       <p>Studios: {studios.map((studio) => studio.name).join(", ")}</p>
//       <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
//       <p>
//         Demographic:{" "}
//         {demographics.map((demographic) => demographic.name).join(", ")}
//       </p>
//       <p>Duration: {duration ? duration : "Unknown"}</p>
//       <p>Rating: {rating}</p>
//     </div>
//   );
// }

// export default function LargeStats({
//   score,
//   members,
//   rank,
//   popularity,
//   type,
//   studios,
// }) {
//   return (
//     <div className="anime-stats-big">
//       <div className="score">
//         <h1>Score</h1>
//         <h2>{score}</h2>
//         <p>{members ? members.toLocaleString() : "-"} members</p>
//       </div>
//       <div className="more-stats">
//         <div className="top-stats">
//           <h1>Ranked {rank ? `#${rank.toLocaleString()}` : "N/A"}</h1>
//           <h1>
//             Popularity {popularity ? `#${popularity.toLocaleString()}` : "N/A"}
//           </h1>
//           <h1>Members {members.toLocaleString()}</h1>
//         </div>
//         <div className="bottom-stats">
//           <p>{type}</p>
//           <p>{studios.map((studio) => studio.name).join(", ")}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { nanoid } from "nanoid";
// import { Link } from "react-router-dom";

// export default function RelatedEntries({ relations }) {
//   return (
//     <section className="anime-related">
//       <h1 className="section-title">Related Entries</h1>
//       {relations.map((relation) => {
//         return (
//           <div key={nanoid()} className="related-entry">
//             <p>{relation.relation}: </p>
//             <div className="entry-container" key={nanoid()}>
//               {relation.entry.map((entry) => {
//                 const isAnime = entry.type == "anime";
//                 if (isAnime) {
//                   return (
//                     <div className="entry" key={entry.mal_id}>
//                       <Link
//                         to={`../anime/${entry.mal_id}`}
//                         className="entry-link"
//                         onClick={() => getAnimeId()}
//                       >
//                         {entry.name}
//                       </Link>
//                       <p>{` (${entry.type})`}</p>
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div className="entry" key={entry.mal_id}>
//                       <p>
//                         {entry.type
//                           ? `${entry.name} (${entry.type})`
//                           : entry.name}
//                       </p>
//                     </div>
//                   );
//                 }
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// }

// export default function SmallStats({ score, rank, popularity, members }) {
//   return (
//     <div className="anime-stats-small">
//       <p>Score: {score || "N/A"}</p>
//       <p>Ranked: {rank ? `#${rank.toLocaleString()}` : "N/A"}</p>
//       <p>
//         Popularity: {popularity ? `#${popularity.toLocaleString()}` : "N/A"}
//       </p>
//       <p>Members: {members.toLocaleString()}</p>
//     </div>
//   );
// }
