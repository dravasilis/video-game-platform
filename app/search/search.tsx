"use client";
import { setSearchPressed } from "@/redux/features/search/searchSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchSvg from "../../public/svg/search.svg";
import "./search.scss";
import {
  clearGames,
  fetchSearchedGames,
  selectSearchedGames,
} from "@/redux/features/games/gamesSlice";
import Link from "next/link";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isPressed = useSelector((state: RootState) => state.search.isPressed);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        dispatch(setSearchPressed(true));
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        dispatch(setSearchPressed(false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  // Auto-focus when search opens
  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isPressed]);

  // 🔹 Debounce Effect (Waits 1.5 sec before dispatching)
  useEffect(() => {
    if (!searchTerm) {
      dispatch(clearGames());
      return;
    } // Don't fetch if empty

    const timeout = setTimeout(() => {
      dispatch(
        fetchSearchedGames({
          search: searchTerm,
          search_exact: true,
          page_size: 10,
        })
      );
    }, 500); // 1.5 sec delay
    console.log(searchResults);

    return () => clearTimeout(timeout); // Clear timeout on new input
  }, [searchTerm]);
  const searchResults = useSelector(selectSearchedGames);

  return (
    <>
      {!isPressed && (
        <button
          className="cursor-pointer"
          onClick={() => dispatch(setSearchPressed(true))}
        >
          <Image
            src={searchSvg}
            alt="searchSvg"
            width={40}
            height={40}
            className="invert brightness-0"
          />
        </button>
      )}

      {isPressed && (
        <div className="input-container" ref={searchContainerRef}>
          <div className="flex items-center gap-1 w-full">
            <Image src={searchSvg} width={32} height={32} alt="search" />
            <form action="/search" className="w-full">
              <input
                name="term"
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <p className="flex gap-1 my-[6px]">
            <span className="hotkeys">Ctrl</span>
            <span className="hotkeys">K</span>
          </p>
          {searchResults && searchResults.searchedGames?.results && (
            <div className="searchContainer animate-drop-down">
              {searchResults.searchedGames.results.map((game, index) => (
                <Link
                  href={`/games/${game.id}`}
                  key={index}
                  className="flex items-center gap-2 hover:bg-[#e0e0e0] duration-75 px-4 py-2 cursor-pointer border-b border-primary-300"
                >
                  <Image
                    src={game.background_image}
                    width={1080}
                    height={720}
                    alt="game"
                    className="rounded-md object-cover max-sm:w-[35px] max-sm:h-[35px] w-[65px] h-[65px]"
                  />
                  <span className="text-sm max-sm:text-xs">{game.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
