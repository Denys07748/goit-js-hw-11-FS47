import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '29295423-17b569e792d85c50ff51a3d1b';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=4`
    )
      .then(response => {
        response.json();
      })
      .then(data => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        console.log(data);
        this.page += 1;

        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
