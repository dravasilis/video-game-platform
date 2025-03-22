export interface BasicPagination {
	page?: number,
	page_size?: number,
	search?: string,
    ordering?:string,
	next?: string,
	previous?: string
}
