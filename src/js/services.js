import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "40923797-6aa6ccd63203db4fea8082569"

export function imagesSearchService(query, page) {
  return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
}