import Notiflix from 'notiflix';
import axios from 'axios';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.js-gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let value = '';

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);
loadBtn.hidden = false;

function onSubmit(evt) {
  evt.preventDefault();

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

      loadBtn.hidden = false;
    })
    .catch(err => Notiflix.Notify.failure('Sorry, something went wrong'));
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
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy">
    <div class="info">
      <p class="info-item"><b>Likes</b>${likes}</p>
      <p class="info-item"><b>Views</b>${views}</p>
      <p class="info-item"><b>Comments</b>${comments}</p>
      <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div>
  </img>
</div>`
    )
    .join('');

  gallery.innerHTML = markup;
}

function onLoad() {
  page += 1;
  getPhotos(page)
    .then(data => {
      createMarkup(data.hits);
      if (data.hits === data.totalHits) {
      }
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadBtn.hidden = true;
    })
    .catch(err => console.log(err));
}
