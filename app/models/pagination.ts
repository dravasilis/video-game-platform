export interface BasicPagination {
	page?: number,
	page_size?: number,
	search?: string,
	search_precise?: boolean,
	search_exact?: boolean,
	ordering?: string,
	next?: string,
	previous?: string;
	genres?: string;
	publishers?: string;
	platforms?: number;
}
