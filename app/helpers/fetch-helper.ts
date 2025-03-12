import { environment } from "../../env/environment";

export const fetchHelper = async (endpoint: string) => {
    const res = await fetch(
        'https://www.giantbomb.com/api' + endpoint + '?' + new URLSearchParams({ format: 'json', api_key: environment.apiKey })

    );
    const data = await res.json();
    return data;
};
