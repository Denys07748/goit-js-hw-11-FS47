import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '29295423-17b569e792d85c50ff51a3d1b';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.total = 0;
    this.totalRenderHits = 0;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(data => {
        console.log(data);

        if (data.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.resetTotal();
          return;
        }

        this.total = data.totalHits;

        Notiflix.Notify.info(`Hooray! We found ${this.total} images.`);

        setTimeout(() => {
          this.incrementPage();
        }, 500);

        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetTotal() {
    this.total = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
