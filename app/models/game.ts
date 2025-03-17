import { ESRB_rating } from "./esrb-rating";
import { Genre } from "./genre";
import { Platform } from "./platform";
import { Rating } from "./rating";
import { ShortScreenshot } from "./short-screenshot";
import { StoreData } from "./store";
import { Tag } from "./tag";

type AddedByStatus =
	| "beaten"
	| "dropped"
	| "owned"
	| "playing"
	| "toplay"
	| "yet";
export interface Game {
	added: number; //users count that added this game in their lists
	added_by_status: AddedByStatus;
	background_image: string;
	clip?: string;
	dominant_color: string; //for example fff
	esrb_rating: ESRB_rating;
	genres: Genre[],
	id: number,
	metacritic: number,
	name: string,
	parent_platforms: Platform[],
	platforms: Platform[],
	playtime: number,
	rating: number,
	rating_top: number,
	ratings: Rating[],
	ratings_count: number,
	released: string,
	reviews_count: number,
	reviews_text_count: number,
	saturated_color: string,
	short_screenshots: ShortScreenshot[],
	slug: string,
	stores: StoreData[],
	suggestions_count: number,
	tags: Tag[],
	tba: boolean,
	updated: string,
	user_game?: string;
}

