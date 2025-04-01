import { BasicPagination } from "../models/pagination";

export const fetchHelper = async <T extends BasicPagination>(endpoint: string, pagination: T = { page_size: 100 } as T) => {
    const API_KEY = process.env.API_KEY;
    console.log(pagination);

    // const API_KEY = process.env.API_KEY;
    const params = new URLSearchParams({
        key: API_KEY ?? '',
        // key: environment.RAWGApiKey,
        cors: 'no-cors',
        ...Object.fromEntries(Object.entries(pagination ?? {}).map(([key, value]) => [key, String(value)])), // Ensure values are strings
    });
    try {
        const res = await fetch(
            `https://api.rawg.io/api${endpoint}?${params}`

        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);

    }
};
