import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '29295423-17b569e792d85c50ff51a3d1b';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.total = 0;
    this.totalRenderHits = 0;
  }

  async fetchImages() {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: '29295423-17b569e792d85c50ff51a3d1b',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
      },
    });

    if (response.data.hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    this.total = response.data.totalHits;
    console.log(this.total);

    // setTimeout(() => {
    //   this.incrementPage();
    // }, 500);

    return response.data.hits;
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
