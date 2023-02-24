import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input')
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;


form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoad);

function onSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    page = 1;


    searchConstructor().then(totalHits => {
        console.log(totalHits);
        if (totalHits === 0) {
            // loadMoreBtn.hidden = true;
            gallery.innerHTML = "";
            
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        };

        if (totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            loadMoreBtn.hidden = false;
        };
    }).catch(error => console.log(error));

};


function onLoad() {
   page += 1;

   searchConstructor();
}



async function pixabayAPI() {
    const KEY = '33878200-75945f3143f242bd251e2a138';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchInput.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);

    return response.data;
};

async function searchConstructor() {
    const constructor = await pixabayAPI(searchInput.value).then(data => {
        // console.log(data);
        createImgList(data.hits);

        return data.totalHits;
    });

    return constructor;
};


function createImgList(listImg) {
    const markupImg = listImg.map(item => 
    `<div class="photo-card">
        <a href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        </a>
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

    lightbox.refresh();

    return gallery.insertAdjacentHTML('beforeend', markupImg);
};