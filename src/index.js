import './sass/index.scss';
import PixabayApiService from './js/pixabay-service';
import getRefs from './js/get-refs';
import renderCards from './js/render-cards';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();

console.log(pixabayApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchImages().then(renderCards);
}

function onLoadMore() {
  pixabayApiService.fetchImages().then(renderCards);
}
