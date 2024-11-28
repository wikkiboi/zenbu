import { Link } from "@tanstack/react-router";
import ShortSearchBar from "../components/ShortSearchBar";
import NavLink from "./NavLink";
import leafIcon from "../svg/maple-leaf.svg";
import homeIcon from "../svg/home.svg";
import rankingIcon from "../svg/ranking.svg";
import searchIcon from "../svg/magnifying-glass.svg";
import dropdownIcon from "../svg/dropdown-icon.svg";

// bg-[#7A82A]

export default function Header() {
  return (
    <header className="navbar bg-base-100">
      <Link to="/" className="btn btn-ghost justify-start">
        zenbu
      </Link>
      <nav className="ml-auto gap-1">
        <button
          className="btn btn-ghost"
          onClick={() => {
            const dialog = document.getElementById(
              "search-modal"
            ) as HTMLDialogElement;
            dialog.showModal();
          }}
        >
          <img
            src={searchIcon}
            alt="Search Icon"
            className="w-3 pt-0.5 invert"
          />
          Search
        </button>
        <ShortSearchBar />
        <div className="hidden md:flex">
          <NavLink path="/">
            <img src={homeIcon} alt="Home Icon" className="w-3 pt-0.5 invert" />
            Home
          </NavLink>
          <NavLink path="/ranking">
            <img
              src={rankingIcon}
              alt="Ranking Icon"
              className="w-3 pt-0.5 invert"
            />
            Rankings
          </NavLink>
          <NavLink path="/seasonal">
            <img src={leafIcon} alt="Leaf Icon" className="w-3 pt-0.5 invert" />
            Seasonal
          </NavLink>
        </div>
        <div className="md:hidden dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <img
              src={dropdownIcon}
              alt="Dropdown Icon"
              className="w-3 invert"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 z-[1] rounded-box w-52"
          >
            <li>
              <NavLink path="/">
                <img
                  src={homeIcon}
                  alt="Home Icon"
                  className="w-3 pt-0.5 invert"
                />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink path="/ranking">
                <img
                  src={rankingIcon}
                  alt="Ranking Icon"
                  className="w-3 pt-0.5 invert"
                />
                Rankings
              </NavLink>
            </li>
            <li>
              <NavLink path="/seasonal">
                <img
                  src={leafIcon}
                  alt="Leaf Icon"
                  className="w-3 pt-0.5 invert"
                />
                Seasonal
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
