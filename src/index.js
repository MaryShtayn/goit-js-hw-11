import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.js-gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let value = '';
let totalHits = 0;

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);

function onSubmit(evt) {
  evt.preventDefault();
  loadBtn.classList.add('.is_hidden');
  const searchQuery = evt.currentTarget.elements.searchQuery.value;
  evt.target.reset();
  if (searchQuery === '') {
    Notiflix.Notify.failure('The field must be filled');
    return;
  }

  async function getPhotos(page = 1, value = searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY_API = '32999869-250accc55f8619ccb56097a0b';
    const searchParam = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });
    const response = await axios.get(
      `${BASE_URL}?key=${KEY_API}&q=${value}&page=${page}&${searchParam}`
    );
    return response.data;
  }

  getPhotos()
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(data.hits);
      // if (page < data.total)
      loadBtn.classList.remove('.is_hidden');
    })
    .catch(err => Notiflix.Notify.failure('Sorry, something went wrong'));
  loadBtn.classList.add('.is_hidden');
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__link" href="${largeImageURL}">  
  <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy"></img>
    <div class="info">
      <p class="info__item"><b>Likes</b><br/>${likes}</p>
      <p class="info__item"><b>Views</b><br/> ${views}</p>
      <p class="info__item"><b>Comments</b><br/> ${comments}</p>
      <p class="info__item"><b>Downloads</b><br/> ${downloads}</p>
    </div>
  </a>`
    )
    .join('');

  gallery.innerHTML = markup;
  function onOpenModal(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
      return;
    }
  }
  const lightbox = new SimpleLightbox('.gallery__link', {
    // captionsData: 'alt',
    // captionDelay: 250,
  });
  lightbox.on('show.simplelightbox', function () {
    gallery.addEventListener('click', onOpenModal);
  });
}

function onLoad() {
  page += 1;
  getPhotos(page)
    .then(data => {
      createMarkup(data.hits);
      gallery.refresh();
      if (data.hits === data.totalHits) {
      }
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.hidden = true;
    })
    .catch(err => console.log(err));
}
