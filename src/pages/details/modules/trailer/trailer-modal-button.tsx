import { Anime } from "../../../../types";
import { CircleAlert, Play } from "lucide-react";

interface TrailerModalButtonProps {
  animeData: Anime;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function TrailerModalButton({
  animeData,
  setIsOpen,
  setTrailerUrl,
}: TrailerModalButtonProps) {
  const openModal = () => {
    if (!animeData.trailer.embed_url) {
      return;
    }
    const dialog = document.getElementById(
      "trailer-modal"
    ) as HTMLDialogElement;
    dialog.showModal();
    setTrailerUrl(`${animeData.trailer.embed_url}`);
    setIsOpen(true);
  };

  return (
    <div className="w-10/12 relative hover:cursor-pointer hover:opacity-90 transition duration-200">
      {animeData.trailer.images.large_image_url ? (
        <img
          src={animeData.trailer.images.large_image_url}
          className="w-full object-cover rounded"
          alt="Trailer thumbnail"
        />
      ) : (
        <div className="w-56 md:w-72 lg:w-96 flex items-center justify-center border aspect-video bg-base-200 rounded">
          <CircleAlert className="size-5 mr-1" />
          No trailer available
        </div>
      )}

      {animeData.trailer.embed_url && (
        <>
          <button
            className="absolute group inset-0 z-10 flex items-center justify-center"
            onClick={openModal}
          >
            <div className="bg-base-100 group-hover:bg-base-300 rounded border-2 px-2 py-0.5">
              <Play className="w-10 h-6" />
            </div>
          </button>
          <h3 className="absolute inset-0 flex items-end justify-start text-base md:text-lg p-1 md:p-2 bg-gradient-to-t from-black/10 to-transparent">
            Trailer
          </h3>
        </>
      )}
    </div>
  );
}
