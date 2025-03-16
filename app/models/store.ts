export interface Store{
    domain:string,
    games_count:number,
    id:string,
    image_background:string,
    name:string,
    slug:string
}

export interface StoreData{
    id:number,
    store:Store
}