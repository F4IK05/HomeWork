import axios from "axios";

const fetcher = async (query: string) => {
    const url = `https://api.thecatapi.com/v1/breeds/search?q=${query}`;

    const response = await axios.get(url, {
        headers: {
            'x-api-key': 'live_jsH3KZUwrCajnAsxQVtS0li2LbbuhZ4myECIZwWb6Nhqm2SiZh9YN2ECFxXRnWXg',
        }
    });

    return response.data;
}

export default fetcher;
