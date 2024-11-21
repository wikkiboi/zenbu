import { Link } from "@tanstack/react-router";
import ShortSearchBar from "../components/ShortSearchBar";

export default function Header() {
  return (
    <header className="navbar bg-[#7A82AA]">
      <Link to="/" className="btn btn-ghost navbar-start">
        Logo
      </Link>
      <nav className="navbar-end gap-1">
        <button
          className="btn btn-ghost"
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
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <Link
          className="btn btn-ghost"
          activeProps={{
            className: "bg-[#87faff]",
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          className="btn btn-ghost"
          activeProps={{
            className: "bg-[#87faff]",
          }}
          to="/ranking"
        >
          Rankings
        </Link>
        <Link
          className="btn btn-ghost"
          activeProps={{
            className: "bg-[#87faff]",
          }}
          to="/seasonal"
        >
          Seasonal
        </Link>
      </nav>
    </header>
  );
}
