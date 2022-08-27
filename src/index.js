import './sass/index.scss';
import PixabayApiService from './js/pixabay-service';
import getRefs from './js/get-refs';
import renderCards from './js/render-cards';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();

// console.log(pixabayApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  clearImageContainer();
  refs.loadMore.classList.add('is-hidden');
  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  if (pixabayApiService.query === '') {
    Notiflix.Notify.warning('The input field cannot be empty.');
    return;
  }

  refs.loadMore.classList.remove('is-hidden');
  fetchImages();
}

function fetchImages() {
  refs.loadMore.disabled = true;

  pixabayApiService
    .fetchImages()
    .then(data => {
      renderCards(data);
      refs.loadMore.disabled = false;
      lightbox();

      if (
        pixabayApiService.page * pixabayApiService.per_page >
        pixabayApiService.total
      ) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMore.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

function lightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // const gallery = $('.gallery a').simpleLightbox();
  // gallery.refresh();

  return lightbox;
}

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}
