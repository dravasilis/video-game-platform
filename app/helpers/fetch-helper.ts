import { environment } from "../../env/environment";
import { HttpResponse } from "../models/httpResponse";

export const fetchHelper = async (endpoint: string): Promise<HttpResponse> => {
    const res = await fetch(
        'https://www.giantbomb.com/api' + endpoint + '?' + new URLSearchParams({ format: 'json', api_key: environment.apiKey })

    );
    const data = await res.json();
    return data;
};
