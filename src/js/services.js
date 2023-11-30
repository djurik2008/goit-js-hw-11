import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "40923797-6aa6ccd63203db4fea8082569"

export function imagesSearchService(query, page) {
    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
}

export function createMarkup(arr) {
    return arr.map(({webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads}) =>
    `<a href="${largeImageURL}" class="link">
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-item__img" />
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>Views: </b>${views}
      </p>
      <p class="info-item">
        <b>Comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads: </b>${downloads}
      </p>
    </div>
  </div>
  </a>`).join("")
}