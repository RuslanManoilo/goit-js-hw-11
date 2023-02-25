function createImgList(listImg) {
    if (listImg.length > 0) {
        const markupImg = listImg.map(item => {
            return `<a href="${item.largeImageURL}" class="card">
                        <div class="photo-card">
                            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="gallery-img" />
                            <div class="info">
                                <p class="info-item">
                                    <b>Likes</b>
                                    <b>${item.likes} ❤</b>
                                </p>
                                <p class="info-item">
                                    <b>Views </b>
                                    <b>${item.views} 👀</b>
                                </p>
                                <p class="info-item">
                                    <b>Comments</b>
                                    <b>${item.comments} 💬</b>
                                </p>
                                <p class="info-item">
                                    <b>Downloads</b>
                                    <b>${item.downloads} ✔</b>
                                </p>
                            </div>
                        </div>
                    </a>`}).join('');
        
        gallery.insertAdjacentHTML('beforeend', markupImg);
        lightbox.refresh(); 
    } else {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
};


export {createImgList};