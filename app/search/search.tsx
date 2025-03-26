"use client";
import Form from "next/form";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./search.scss";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault(); // Prevents the default browser search (if any)
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="pr-14 max-[640px]:pr-0">
      <div
        className="input-container"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-1">
          <Image src={"/svg/search.svg"} width={32} height={32} alt="search" />
          <Form action="/search">
            {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
            <input
              name="term"
              ref={inputRef}
              type="text"
              placeholder="Search"
            />
          </Form>
        </div>
        <p className="flex gap-1 my-[6px]">
          <span className="hotkeys">Ctrl</span>
          <span className="hotkeys">K</span>
        </p>
      </div>
    </div>
  );
};

export default Search;
