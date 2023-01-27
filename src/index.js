import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
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

const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);

async function onSubmit(evt) {
  try {
    evt.preventDefault();
    page = 1;
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    evt.target.reset();

    if (searchQuery === '') {
      Notiflix.Notify.failure('The field must be filled');
      return;
    }

    const data = await getPhotos();
    if (!data.hits.length) {
      loadBtn.classList.add('is-hidden');

      gallery.innerHTML = '';

      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      gallery.innerHTML = '';
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    createMarkup(data.hits);

    windowUpScrollTo();
    lightbox.refresh();

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

  gallery.insertAdjacentHTML('beforeend', markup);
}

async function onLoad() {
  try {
    page += 1;
    const data = await getPhotos(page);
    if (page * perPage >= data.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );

      loadBtn.classList.add('is_hidden');
    }

    createMarkup(data.hits);
    windowDownScrollBy();

    lightbox.refresh();

    gallery.refresh();
  } catch (err) {
    console.log('Error');
  }
}

function windowUpScrollTo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function windowDownScrollBy() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
