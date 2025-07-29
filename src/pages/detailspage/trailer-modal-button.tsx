import { Anime } from "../../api/types";
import { Play } from "lucide-react";

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
    const dialog = document.getElementById(
      "trailer-modal"
    ) as HTMLDialogElement;
    dialog.showModal();
    setTrailerUrl(`${animeData.trailer.embed_url}`);
    setIsOpen(true);
  };

  return (
    <div className="w-4/5 mr-auto relative hover:cursor-pointer hover:opacity-90 transition duration-200">
      <img src={animeData.trailer.images.large_image_url} />

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
    </div>
  );
}
