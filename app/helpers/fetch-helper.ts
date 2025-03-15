import { log } from "console";
import { environment } from "../../env/environment";
import { HttpResponse } from "../models/httpResponse";
import { BasicPagination } from "../models/pagination";

export const fetchHelper = async <T extends BasicPagination> (endpoint: string,pagination:T={limit:100} as T): Promise<HttpResponse> => {
    const params = new URLSearchParams({
        format: 'json',
        api_key: environment.apiKey,
        ...Object.fromEntries(Object.entries(pagination).map(([key, value]) => [key, String(value)])) // Ensure values are strings
    });
    const res = await fetch(
        `https://www.giantbomb.com/api${endpoint}?${params}`

    );
    const data = await res.json();
    return data;
};
