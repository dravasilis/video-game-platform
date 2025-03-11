export const fetchHelper = async (endpoint: string) => {
    const res = await fetch(
        endpoint + '?api_key=6d9b2410baa96c3c5e70c80ae0b8f345cab7d7b4&format=json'
    );
    const data = await res.json();
    return data;
};
