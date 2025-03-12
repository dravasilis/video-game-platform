type StatusCode = 1 | 100 | 101 | 102 | 103 | 104 | 105;

export interface HttpResponse {
    status_code: StatusCode,
    error: string,
    number_of_total_results: number,
    number_of_page_results: number,
    limit: number,
    offset: number,
    results: any[];
}
