export interface Platform {
    id: number,
    name: string,
    slug: string;
}
export interface PlatformsDetails {
    platform: Platform,
    released_at: string,
}
