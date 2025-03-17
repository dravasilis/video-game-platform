export interface HttpResponse<T> {
    count: number,
    description: string,
    filters: string,
    next: string,
    nofollow: boolean,
    nofollow_collections: string,
    noindex: boolean,
    previous: string,
    results: T[],
    seo_description: string,
    seo_h1: string,
    seo_keywords: string,
    seo_title: string,

}
