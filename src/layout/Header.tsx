import { Link, useLocation } from "@tanstack/react-router";
import ShortSearchBar from "../components/search/short-search-bar";
import NavLink from "./NavLink";
import leafIcon from "../svg/maple-leaf.svg";
import homeIcon from "../svg/home.svg";
import rankingIcon from "../svg/ranking.svg";
import searchIcon from "../svg/magnifying-glass.svg";
import dropdownIcon from "../svg/dropdown-icon.svg";
import { useState, useRef, useEffect } from "react";
import { scrollToTop } from "../helper";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-base-100">
      <nav className="flex min-h-16 max-w-7xl items-center justify-center mx-auto gap-2 px-2">
        <Link
          onClick={() => scrollToTop("instant")}
          to="/"
          className="btn btn-ghost justify-start mr-auto"
        >
          zenbu
        </Link>
        <button
          className="btn btn-ghost"
          onClick={() => {
            const dialog = document.getElementById(
              "search-modal"
            ) as HTMLDialogElement;
            dialog.showModal();
            setIsSearchModalOpen(true);

            if (dialog) {
              dialog.showModal();
              setTimeout(() => {
                const input = document.getElementById(
                  "search-input"
                ) as HTMLInputElement | null;
                input?.focus();
              }, 0);
            }
          }}
        >
          <img
            src={searchIcon}
            alt="Search Icon"
            className="w-3 pt-0.5 invert"
          />
          Search
        </button>
        <ShortSearchBar
          isSearchModalOpen={isSearchModalOpen}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
        <div className="hidden md:flex gap-2">
          <NavLink
            path="/"
            activeStyle={`${pathname === "/" ? "btn-primary" : "btn-ghost"} `}
          >
            <img
              src={homeIcon}
              alt="Home Icon"
              className={`w-3 pt-0.5 ${pathname === "/" ? "" : "invert"}`}
            />
            Home
          </NavLink>
          <NavLink
            path="/ranking"
            activeStyle={`${
              pathname === "/ranking" ? "btn-primary" : "btn-ghost"
            }`}
          >
            <img
              src={rankingIcon}
              alt="Ranking Icon"
              className={`w-3 pt-0.5 ${
                pathname === "/ranking" ? "" : "invert"
              }`}
            />
            Rankings
          </NavLink>
          <NavLink
            path="/seasonal"
            activeStyle={`${
              pathname === "/seasonal" ? "btn-primary" : "btn-ghost"
            }`}
          >
            <img
              src={leafIcon}
              alt="Leaf Icon"
              className={`w-3 pt-0.5 ${
                pathname === "/seasonal" ? "" : "invert"
              }`}
            />
            Seasonal
          </NavLink>
        </div>
        <div
          ref={dropdownRef}
          className="md:hidden dropdown dropdown-bottom dropdown-end"
        >
          <button
            tabIndex={0}
            className={`btn btn-ghost ${open && "border-primary"}`}
            onClick={() => setOpen(!open)}
          >
            <img
              src={dropdownIcon}
              alt="Dropdown Icon"
              className="w-3 invert"
            />
          </button>
          {open && (
            <ul
              tabIndex={0}
              className="flex flex-col gap-2 dropdown-content menu p-2 shadow-2xl bg-base-300 z-[1] rounded-box w-52 max-sm:w-[97vw] translate-y-1 mx-auto mt-2"
            >
              <li onClick={() => setOpen(false)}>
                <NavLink
                  path="/"
                  activeStyle={`${
                    pathname === "/" ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <img
                    src={homeIcon}
                    alt="Home Icon"
                    className={`w-3 pt-0.5 ${pathname === "/" ? "" : "invert"}`}
                  />
                  Home
                </NavLink>
              </li>
              <li onClick={() => setOpen(false)}>
                <NavLink
                  path="/ranking"
                  activeStyle={`${
                    pathname === "/ranking" ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <img
                    src={rankingIcon}
                    alt="Ranking Icon"
                    className={`w-3 pt-0.5 ${
                      pathname === "/ranking" ? "" : "invert"
                    }`}
                  />
                  Rankings
                </NavLink>
              </li>
              <li onClick={() => setOpen(false)}>
                <NavLink
                  path="/seasonal"
                  activeStyle={`${
                    pathname === "/seasonal" ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <img
                    src={leafIcon}
                    alt="Leaf Icon"
                    className={`w-3 pt-0.5 ${
                      pathname === "/seasonal" ? "" : "invert"
                    }`}
                  />
                  Seasonal
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
