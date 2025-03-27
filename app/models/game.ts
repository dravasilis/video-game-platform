import { ESRB_rating } from "./esrb-rating";
import { Genre } from "./genre";
import { PlatformsDetails } from "./platform";
import { Publisher } from "./publisher";
import { Rating } from "./rating";
import { ShortScreenshot } from "./short-screenshot";
import { StoreData } from "./store";
import { Tag } from "./tag";

interface AddedByStatus {
	beaten: number,
	dropped: number,
	owned: number,
	playing: number,
	toplay: number,
	yet: number;
}

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
	parent_platforms: PlatformsDetails[],
	platforms: PlatformsDetails[],
	playtime: number,
	rating: number,
	rating_top: number,
	ratings: Rating[],
	ratings_count: number,
	released: string,
	reviews_count: number,
	reviews_text_count: string,
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
export interface GameDetails extends Game {
	name_original: string,
	description: string,
	description_raw: string,
	metacritic_platforms: MetacriticPlatform[],
	background_image_additional: string,
	website: string,
	reactions: string[],
	screenshots_count: number,
	movies_count: number,
	creators_count: number,
	achievements_count: number,
	parent_achievements_count: number,
	reddit_url: string,
	reddit_name: string,
	reddit_description: string,
	reddit_logo: string,
	reddit_count: number,
	twitch_count: string,
	youtube_count: string,
	alternative_names: string[],
	metacritic_url: string,
	parents_count: number,
	additions_count: number,
	game_series_count: number,
	developers: Publisher[];
}
interface MetacriticPlatform {
	metascore: number,
	url: string;
}
