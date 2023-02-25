import { createImgList } from "./createMarkup";
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

    if (searchInput.value.trim().length === 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
    };


    searchConstructor().then(totalHits => {
        if (totalHits === 0) {    
            gallery.innerHTML = "";
            loadMoreBtn.classList.add('visually-hidden');
        };

        if (totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            loadMoreBtn.classList.remove('visually-hidden')
        };
    }).catch(error => console.log(error));
};


function onLoad() {
   page += 1;

   searchConstructor().then(totalHits => {
        const numPages = Math.ceil(totalHits / 40);

        if (page === numPages) {
            loadMoreBtn.classList.add('visually-hidden');
            Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        }
   });
};


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


loadMoreBtn.classList.add('visually-hidden');

Notiflix.Notify.init({
    distance: '15px',
});

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});