"use client";
import {
  fetchDevelopers,
  selectDevelopers,
} from "@/redux/features/developers/developersSlice";
import { fetchGenres, selectGenres } from "@/redux/features/genres/genresSlice";
import {
  fetchPlatforms,
  selectPlatforms,
} from "@/redux/features/platforms/platformsSlice";
import {
  fetchPublishers,
  selectPublishers,
} from "@/redux/features/publishers/publishersSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../../../../public/svg/arrow.svg";
import bow from "../../../../public/svg/bow.svg";
import filterSvg from "../../../../public/svg/filters.svg";
import weapons from "../../../../public/svg/weapons.svg";
import CustomCheckbox from "../checkbox/checkbox";
import "./filters.scss";
import { Genre } from "@/app/models/genre";
import { Platform } from "@/app/models/platform";
import { Publisher } from "@/app/models/publisher";

const Filters = () => {
  const router = useRouter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<Publisher[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<Publisher[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const platforms = useSelector(selectPlatforms);
  const genres = useSelector(selectGenres);
  const publishers = useSelector(selectPublishers);
  const developers = useSelector(selectDevelopers);

  const applyFilters = () => {
    selectedGenres.length > 0 &&
      updateParams("genres", selectedGenres.map((g) => g.slug).join(","));
    selectedPlatforms.length > 0 &&
      updateParams("platforms", selectedPlatforms.map((p) => p.id).join(","));
    selectedPublishers.length > 0 &&
      updateParams(
        "publishers",
        selectedPublishers.map((p) => p.slug).join(",")
      );
    selectedDevelopers.length > 0 &&
      updateParams(
        "developers",
        selectedDevelopers.map((d) => d.slug).join(",")
      );
    setIsFiltersOpen(false);
    setIsCategoryOpen(null);
  };
  const updateParams = (paramTitle: string, paramValues: string) => {
    const params = new URLSearchParams();
    params.set(paramTitle, paramValues);
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    !platforms.platforms && dispatch(fetchPlatforms());
    !genres.genres && dispatch(fetchGenres());
    !publishers.publishers && dispatch(fetchPublishers());
    !developers.developers && dispatch(fetchDevelopers());
  }, [dispatch]);

  return (
    <div className="relative">
      <button
        className="filter-button"
        onClick={() => {
          setIsFiltersOpen(!isFiltersOpen);
          !isFiltersOpen && setIsCategoryOpen(null);
        }}
      >
        <Image src={filterSvg} alt="filters" width={20} height={20} />
        <span className="text-primary-350">Filters</span>
      </button>
      {isFiltersOpen && (
        <div className="filters-dropdown animate-drop-down ">
          <div className="flex items-center justify-center gap-2">
            <Image src={weapons} alt="weapons" width={20} height={20} />
            <span className="text-primary-100 text-lg">
              Choose your weapons
            </span>
            <Image src={weapons} alt="weapons" width={20} height={20} />
          </div>
          {/* GENRES  */}
          <button
            id="genres"
            className="filter-category"
            onClick={() =>
              setIsCategoryOpen(isCategoryOpen === "genres" ? null : "genres")
            }
          >
            <span className="text-sm  text-start">Genres</span>
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className={`${
                isCategoryOpen === "genres" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isCategoryOpen === "genres" && (
            <div className="flex flex-col gap-4 max-h-[15rem] overflow-auto w-full animate-drop-down">
              {genres.genres?.results.map((genre, index) => (
                <CustomCheckbox
                  key={index}
                  id={"genre" + index}
                  checked={selectedGenres.includes(genre)}
                  label={genre.name}
                  valueChange={(checked) =>
                    setSelectedGenres((prev) => {
                      return checked
                        ? [...prev, genre]
                        : prev.filter((g) => g.id !== genre.id);
                    })
                  }
                />
              ))}
            </div>
          )}
          {/* PLATFORMS */}
          <button
            className="filter-category"
            onClick={() =>
              setIsCategoryOpen(
                isCategoryOpen === "platforms" ? null : "platforms"
              )
            }
          >
            <span className="text-sm  text-start">Platforms</span>
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className={`${
                isCategoryOpen === "platforms" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isCategoryOpen === "platforms" && (
            <div className="flex flex-col gap-4 max-h-[15rem] overflow-auto w-full animate-drop-down">
              {platforms.platforms?.results.map((platform, index) => (
                <CustomCheckbox
                  key={index}
                  id={"platform" + index}
                  checked={selectedPlatforms.includes(platform)}
                  label={platform.name}
                  valueChange={(checked) =>
                    setSelectedPlatforms((prev) => {
                      return checked
                        ? [...prev, platform]
                        : prev.filter((p) => p.id !== platform.id);
                    })
                  }
                />
              ))}
            </div>
          )}
          {/* PUBLISHERS  */}
          <button
            className="filter-category"
            onClick={() =>
              setIsCategoryOpen(
                isCategoryOpen === "publishers" ? null : "publishers"
              )
            }
          >
            <span className="text-sm  text-start">Publishers</span>
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className={`${
                isCategoryOpen === "publishers" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isCategoryOpen === "publishers" && (
            <div className="flex flex-col gap-4 max-h-[15rem] overflow-auto w-full animate-drop-down">
              {publishers.publishers?.results.map((publisher, index) => (
                <CustomCheckbox
                  key={index}
                  checked={selectedPublishers.includes(publisher)}
                  id={"publisher" + index}
                  label={publisher.name}
                  valueChange={(checked) =>
                    setSelectedPublishers((prev) => {
                      return checked
                        ? [...prev, publisher]
                        : prev.filter((p) => p.id !== publisher.id);
                    })
                  }
                />
              ))}
            </div>
          )}
          {/* DEVELOPERS  */}
          <button
            className="filter-category"
            onClick={() =>
              setIsCategoryOpen(
                isCategoryOpen === "developers" ? null : "developers"
              )
            }
          >
            <span className="text-sm  text-start">Developers</span>
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className={`${
                isCategoryOpen === "developers" ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {isCategoryOpen === "developers" && (
            <div className="flex flex-col gap-4 max-h-[15rem] overflow-auto w-full animate-drop-down">
              {developers.developers?.results.map((developer, index) => (
                <CustomCheckbox
                  key={index}
                  checked={selectedDevelopers.includes(developer)}
                  id={"developer" + index}
                  label={developer.name}
                  valueChange={(checked) =>
                    setSelectedDevelopers((prev) => {
                      return checked
                        ? [...prev, developer]
                        : prev.filter((d) => d.id !== developer.id);
                    })
                  }
                />
              ))}
            </div>
          )}
          <button
            onClick={() => applyFilters()}
            className="flex items-center gap-2 w-max self-end hover:bg-[#ffffff0e] px-3 py-1 rounded-md duration-100 active:scale-[.98]"
          >
            <Image src={bow} alt="bow" width={20} height={20} />
            <span className="text-primary-300">Apply Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
