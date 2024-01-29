const BASE_URL = 'http://newsapi.org';
const ENDPOINT = 'v2/everything';
const API_KEY = 'dd82ff3604224bf1b224da3ef75c9135';

function getNews(query, page = 1){
    return axios.get(`${BASE_URL}/${ENDPOINT}`, {
        params: {
            apiKey: API_KEY,
            q: query,
            language: "en",
            pageSize:6,
            page,
        }
    })
    .then(({data})=> data);
}

export {getNews}