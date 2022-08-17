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
  if (pixabayApiService.searchQuery === '')
    return alert(
      '"Sorry, there are no images matching your search query. Please try again."'
    );

  pixabayApiService
    .fetchImages()
    .then(hits => {
      clearImageContainer();
      renderCards(hits);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function onLoadMore() {
  pixabayApiService.fetchImages().then(renderCards);
}

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}
