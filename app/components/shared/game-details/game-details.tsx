import { Genre } from "@/app/models/genre";
import { PlatformsDetails } from "@/app/models/platform";
import { Publisher } from "@/app/models/publisher";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../link-button/link-button";
import SeparatingLine from "../separatingLine/separating-line";
import styles from "../../../games/[id]/page.module.scss";
import Metacritic from "../metacritic/metacritic";
interface Props {
  title: string;
  rating: number;
  ratingsCount: number;
  metacritic: number;
  metacriticUrl: string;
  tba?: boolean;
  releaseDate: string;
  developers: Publisher[];
  reddirUrl: string;
  websiteUrl: string;
  genres: Genre[];
  platforms: PlatformsDetails[];
}
const GameDetails = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* TITLE  */}
        <h1 className="text-5xl max-lg:text-3xl max-sm:text-2xl font-bold pb-4 max-sm:pb-0 -ml-4 max-sm:ml-0">
          {props.title}
        </h1>
        {/* RATING  */}
        <button
          onClick={() =>
            document
              .getElementById("ratings")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex gap-2 items-center font-bold hover:cursor-pointer w-max"
        >
          <Image src={"/svg/star.svg"} alt="star" width={20} height={20} />
          {props.rating} / 5
          <span className="text-xs text-primary-200">
            {props.ratingsCount > 1000
              ? Math.floor(props.ratingsCount / 1000)
              : "< 1"}
            K ratings
          </span>
        </button>
        {/* METACRITIC  */}
        <Metacritic rating={props.metacritic} url={props.metacriticUrl} />

        {/* RELEASE DATE  */}
        <div className="text-primary-150 flex flex-col gap-1 items-start max-sm:text-xs">
          <p>
            released {""}
            <span className="text-primary-350  font-bold max-sm:text-sm text-lg">
              {props.tba ? (
                <i>TBA</i>
              ) : (
                new Date(props.releaseDate).toDateString().substring(4)
              )}
            </span>
          </p>
          {/* DEVELOPERS  */}
          <p>
            by{" "}
            {props.developers.map((developer, index) => (
              <Link
                href={"/games?developers=" + developer.slug}
                key={index}
                className=" text-primary-350 font-bold text-lg max-sm:text-sm hover:brightness-75"
              >
                {developer.name}
                {index !== props.developers.length - 1 && ", "}
              </Link>
            ))}
          </p>
          {/* REDDIT */}
          <LinkButton
            redirectUrl={props.reddirUrl}
            svg="/svg/reddit.svg"
            svgWidth={60}
          />
          {/* WEBSITE URL */}
          <LinkButton
            redirectUrl={props.websiteUrl}
            svg="/svg/website.svg"
            text="Website"
          />
        </div>
        {/* GENRES  */}
        <div className="flex items-center gap-2 flex-wrap">
          {props.genres.map((genre, index) => (
            <Link
              href={"/games?genres=" + genre.slug}
              key={index}
              className={styles.pill}
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <SeparatingLine />
        {/* PLATFORMS  */}
        <div className="flex items-center gap-2 flex-wrap">
          {props.platforms.map((platformDetails, index) => (
            <Link
              href={`/games?platforms=${platformDetails.platform.id}`}
              key={index}
              className={styles.pill}
            >
              {platformDetails.platform.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameDetails;
