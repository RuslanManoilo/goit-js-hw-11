import axios from "axios";
import Notiflix from 'notiflix';




const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;


form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoad);

function onSubmit(event) {
    event.preventDefault();

    let searchText = event.target[0].value;


    pixabayAPI(searchText)
    .then(data => {
        gallery.innerHTML = "";
        console.log(data);
        Notiflix.Notify.info(`Hooray! We found ${data.total} images.`);
        createImgList(data.hits);
        loadMoreBtn.hidden = false;
    })
    // .catch(err => console.log(err))
};



async function pixabayAPI(searchText, page) {
    const KEY = '33878200-75945f3143f242bd251e2a138';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);

    return response.data;
};


function createImgList(listImg) {
    const markupImg = listImg.map(item => 
    `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes ${item.likes}</b>
            </p>
            <p class="info-item">
                <b>Views ${item.views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${item.comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${item.downloads}</b>
            </p>
        </div>
    </div>`).join('');

    gallery.insertAdjacentHTML('beforeend', markupImg);
};

function onLoad() {
    page += 1;
    pixabayAPI(page).then(data => {
        console.log(data)
        createImgList(data.hits);
    })
}