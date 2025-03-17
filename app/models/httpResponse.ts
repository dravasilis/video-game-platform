type StatusCode = 1 | 100 | 101 | 102 | 103 | 104 | 105;

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
