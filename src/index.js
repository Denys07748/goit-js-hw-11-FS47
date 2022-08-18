import './sass/index.scss';
import PixabayApiService from './js/pixabay-service';
import getRefs from './js/get-refs';
import renderCards from './js/render-cards';
import Notiflix from 'notiflix';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();

console.log(pixabayApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearImageContainer();
  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  if (pixabayApiService.searchQuery === '') {
    Notiflix.Notify.warning('The input field cannot be empty.');
    return;
  }

  pixabayApiService
    .fetchImages()
    .then(hits => {
      clearImageContainer();
      renderCards(hits);
    })
    .catch(fetchError);
}

function onLoadMore() {
  pixabayApiService.fetchImages().then(renderCards);
}

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}

function fetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
