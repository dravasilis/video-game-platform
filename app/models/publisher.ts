import { Game } from "./game";

export interface Publisher{
    id:number,
    name:string,
    slug:string,
    games_count:number,
    image_background:string,
    games:Game[],
    
}