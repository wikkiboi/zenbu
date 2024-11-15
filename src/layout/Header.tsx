import { Link } from "@tanstack/react-router";
import ShortSearchBar from "../components/ShortSearchBar";

export default function Header() {
  return (
    <header>
      <button
        className="btn"
        onClick={() => {
          const dialog = document.getElementById(
            "search-modal"
          ) as HTMLDialogElement;
          dialog.showModal();
        }}
      >
        Search
      </button>
      <dialog id="search-modal" className="modal">
        <ShortSearchBar />
      </dialog>
      <ShortSearchBar />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/ranking">Rankings</Link>
        <Link to="/seasonal">Seasonal</Link>
      </nav>
    </header>
  );
}
