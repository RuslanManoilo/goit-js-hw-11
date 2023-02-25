async function pixabayAPI() {
    const KEY = '33878200-75945f3143f242bd251e2a138';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchInput.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);

    return response.data;
};


async function searchConstructor() {
    const constructor = await pixabayAPI(searchInput.value).then(data => {
        createImgList(data.hits);
        return data.totalHits;
    });

    return constructor;
};


export {pixabayAPI};
export {searchConstructor};