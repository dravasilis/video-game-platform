import { BasicPagination } from "../models/pagination";

export const fetchHelper = async <T extends BasicPagination>(endpoint: string, pagination?: T) => {
    const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const params = new URLSearchParams({
        key: NEXT_PUBLIC_API_KEY ?? '',
        // key: environment.RAWGApiKey,
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
