import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Synopsis({
  synopsis = "No synopsis available",
}: {
  synopsis: string;
}) {
  const [expandedSynopsis, setExpandedSynopsis] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h2 className="font-bold text-lg">Synopsis</h2>
      <p
        className={`${
          !expandedSynopsis ? "line-clamp-5" : ""
        } whitespace-pre-line`}
      >
        {synopsis}
      </p>
      <button
        onClick={() => setExpandedSynopsis(!expandedSynopsis)}
        className="mt-1 text-primary hover:underline text-sm hidden md:block"
      >
        {expandedSynopsis ? "Show less" : "Read more"}
      </button>
      <button
        onClick={() => setExpandedSynopsis(!expandedSynopsis)}
        className="text-primary  flex justify-center w-full md:hidden hover:bg-base-200 transition-colors rounded"
      >
        {expandedSynopsis ? (
          <ChevronUp className="size-6" />
        ) : (
          <ChevronDown className="size-6" />
        )}
      </button>
    </>
  );
}
