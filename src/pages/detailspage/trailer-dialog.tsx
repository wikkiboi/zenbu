interface TrailerDialogProps {
  trailerUrl: string;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TrailerDialog({
  trailerUrl,
  setTrailerUrl,
  setIsOpen,
}: TrailerDialogProps) {
  const closeModal = () => {
    const dialog = document.getElementById(
      "trailer-modal"
    ) as HTMLDialogElement;
    dialog.close();
    setTrailerUrl("");
    setIsOpen(false);
  };

  return (
    <dialog id="trailer-modal" className="modal">
      <div className="modal-box overflow-visible bg-neutral p-1.5 max-w-screen-xl aspect-video rounded-md">
        {trailerUrl && (
          <iframe src={trailerUrl} className="w-full h-full" allowFullScreen />
        )}
        <form method="dialog" onClick={closeModal}>
          <button
            className="btn btn-sm btn-circle absolute -right-2 -top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={closeModal}>
        <button>close</button>
      </form>
    </dialog>
  );
}
