// import Notiflix from 'notiflix';
// import axios from 'axios';

// const form = document.querySelector('.search-form');
// const gallery = document.querySelector('.js-gallery');
// const btnLoad = document.querySelector('.load-more');

// let value = '';
// let page = 1;
// let totalHits = 0;

// form.addEventListener('submit', handelSubmit);
// btnLoad.addEventListener('click', btnLoadMore);
// console.log(btnLoad);
// console.log(btnLoadMore);

// function handelSubmit(evt) {
//   evt.preventDefault();
//   // btnLoad.classList.add('is_hidden');
//   const searchQuery = evt.target.elements.searchQuery.value;
//   if (!searchQuery) {
//     Notiflix.Notify.failure('Enter Value');
//     return;
//   }
//   // value = searchQuery;
//   evt.target.reset();

//   async function getPhotos(page = 1, value = searchQuery) {
//     try {
//       const BASE_URL = 'https://pixabay.com/api/';
//       const KEY_API = '32999869-250accc55f8619ccb56097a0b';
//       const searchParam = new URLSearchParams({
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//       });
//       const responce = await axios.get(
//         `${BASE_URL}?key=${KEY_API}&q=${value}&page=${page}&${searchParam}`
//       );

//       return responce.data;
//     } catch (err) {}
//   }

//   getPhotos()
//     .then(data => {
//       console.log(data);
//       if (data.length === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//       createMarkup(data.hits);
//
//       // totalPages = Math.ceil(total / 40);

//       // if (page < totalHits) {
//       //   btnLoad.classList.remove('is_hidden');
//       // }
//     })
//     .catch(err => {
//       Notiflix.Notify.failure('something went wrong... try again');
//       btnLoad.classList.add('is_hidden');
//     });
// }

// function createMarkup(arr) {
//   const markup = arr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy">
//     <div class="info">
//       <p class="info-item"><b>Likes</b>${likes}</p>
//       <p class="info-item"><b>Views</b>${views}</p>
//       <p class="info-item"><b>Comments</b>${comments}</p>
//       <p class="info-item"><b>Downloads</b>${downloads}</p>
//     </div>
//   </img>
// </div>`
//     )
//     .join('');

//   gallery.innerHTML = markup;
// }

// function btnLoadMore() {
//   page += 1;
//   if (page === totalPages) {
//     btn.classList.add('is_hidden');
//   }
//   getPhotos(page, value)
//     .then(({ results }) => {
//       const markup = createMarkup(results);
//       list.insertAdjacentHTML('beforeend', markup);
//     })
//     .catch(err => {
//       Notiflix.Notify.failure('something went wrong... trt again');
//       btn.classList.add('is_hidden');
//     });
// }

// // async function btnLoadMore() {
// //   page += 1;

// // if (page === totalHits) {
// //   btnLoad.classList.add('is_hidden');
// // }
// // try {
// //   const { results } = await getPhotos(page, value);
// //   const markup = createMarkup(results);
// //   gallery.insertAdjacentHTML('beforeend', markup);
// // } catch (err) {
// //   Notiflix.Notify.failure('something went wrong... try again');
// //   btnLoad.classList.add('is_hidden');
// // }

// // const KEY_API = `32999869-250accc55f8619ccb56097a0b`;

// // Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:
// // key - твій унікальний ключ доступу до API.
// // q - термін для пошуку. Те, що буде вводити користувач.
// // image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// // orientation - орієнтація фотографії. Постав значення horizontal.
// // safesearch - фільтр за віком. Постав значення true.
// // function onFormSubmit(evt) {
// //   evt.preventDefault();
// //   const { searchQuery } = evt.currentTarget.element;

// //   async function galleryOnSearch() {
// //     const response = await axios.get(
// //       `https://pixabay.com/api/?key=${'KEY_API'}&q=${'searchQuery'}&image-type=photo&orientation=horizontal&safesearch=true&per_page=40`
// //     );

// //     return response;
// //     // console.log(response);
// //     galleryOnSearch();
// //   }

// //   function renderGalleryMarkup() {}
// // }

// // const foo = function (...rest) {console.log(rest);};foo(1, 2, 3, 4, 5);
// // const numbers = [5, 6, 7, 8, 9]; console.log(...numbers);

// // const students = [
// //   { name: 'Манго', score: 83 },
// //   { name: 'Поли', score: 59 },
// //   { name: 'Аякс', score: 37 },
// //   { name: 'Киви', score: 94 },
// //   { name: 'Хьюстон', score: 64 },
// // ];

// // const student = { name: 'Манго', score: 83 };
// // const arr = Object.entries(student);
// // console.log(arr);
// // arr.forEach(item => {
// //   console.log(item);
// // });

// // const sum = students.reduce((acc, student) => {
// //   return acc + student.score;
// // }, 0);
// // console.log(sum);

// // let count = 0;

// // const btn = document.querySelector('.btn-test');
// // const span = document.querySelector('.span-test');
// // btn.addEventListener('click', () => {
// //   count += 1;
// //   span.textContent = count;
// // });
// // function foo() {
// //   console.log('start foo');
// //   buz();
// //   console.log('end foo');
// // }

// // console.log('start');
// // foo();
// // console.log('end');

// // function buz() {
// //   console.log('start buz');
// // }

// // синтаксис вычисляемых свойст объекта
// // const tweets = [
// //   { id: '000', likes: 5, tags: ['js', 'nodejs'] },
// //   { id: '001', likes: 2, tags: ['html', 'css'] },
// //   { id: '002', likes: 17, tags: ['html', 'js', 'nodejs'] },
// //   { id: '003', likes: 8, tags: ['css', 'react'] },
// //   { id: '004', likes: 0, tags: ['js', 'nodejs', 'react'] },
// // ];
// // const tags = tweets
// //   .flatMap(({ tags }) => {
// //     return tags;
// //   })
// //   .reduce((acc, tag) => {
// //     if (acc[tag]) {
// //       acc[tag] = acc[tag] + 1;
// //     } else {
// //       acc[tag] = 1;
// //     }
// //     return acc;
// //   }, {});

// //  (acc, tag) => ({ ...acc, [tag]: acc[tag] ? (acc[tag] += 1) : 1 }), неявне повернення
// //  console.log(tags);
