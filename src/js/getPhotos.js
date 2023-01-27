import axios from 'axios';
import { page, searchQuery, perPage } from '../index';

export default async function getPhotos() {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '32999869-250accc55f8619ccb56097a0b';
  const searchParam = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  });
  const response = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${searchQuery}&page=${page}&${searchParam}`
  );
  return response.data;
}
