import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getPhotos from './js/getPhotos';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.js-gallery');
const loadBtn = document.querySelector('.load-more');

export let page = 1;
export let searchQuery = '';
export let totalHits = 0;
export const perPage = 40;

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);

async function onSubmit(evt) {
  try {
    evt.preventDefault();
    page = 1;
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    evt.target.reset();

    if (!searchQuery) {
      Notiflix.Notify.failure('The field must be filled');
      return;
    }

    const data = await getPhotos();
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    createMarkup(data.hits);
    loadBtn.classList.remove('is_hidden');
  } catch (err) {
    Notiflix.Notify.failure('Sorry, something went wrong');
  }
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
      }) => `<a class="gallery__link" href="${largeImageURL}">  
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
    captionDelay: 250,
  });
  lightbox.on('show.simplelightbox', function () {
    gallery.addEventListener('click', onOpenModal);
  });
}

async function onLoad() {
  try {
    page += 1;
    const data = await getPhotos(page);
    if (page * perPage >= data.totalHits) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.classList.add('is_hidden');
    }
    createMarkup(data.hits);
    gallery.refresh();
  } catch (err) {
    console.log('Error');
  }
}
