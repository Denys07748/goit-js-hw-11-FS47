import Notiflix from 'notiflix';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api';

    return fetch(
      `${BASE_URL}/?key=29295423-17b569e792d85c50ff51a3d1b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=4`
    )
      .then(response => response.json())
      .then(data => {
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
