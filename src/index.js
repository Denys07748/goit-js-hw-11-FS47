import './sass/index.scss';
import PixabayApiService from './js/pixabay-service';
import getRefs from './js/get-refs';
import renderCards from './js/render-cards';
import LoadMoreBtn from './js/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

async function onSearch(e) {
  e.preventDefault();

  clearImageContainer();
  // refs.loadMore.classList.add('is-hidden');
  loadMoreBtn.hide();
  pixabayApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApiService.resetPage();
  pixabayApiService.resetTotal();
  if (pixabayApiService.query === '') {
    Notiflix.Notify.warning('The input field cannot be empty.');
    return;
  }

  // refs.loadMore.classList.remove('is-hidden');
  loadMoreBtn.show();
  const rend = await fetchImages();

  if (pixabayApiService.total !== 0) {
    Notiflix.Notify.info(`Hooray! We found ${pixabayApiService.total} images.`);
  }
}

async function fetchImages() {
  // refs.loadMore.disabled = true;
  loadMoreBtn.disable();

  try {
    const dataHits = await pixabayApiService.fetchImages();
    renderCards(dataHits);

    loadMoreBtn.enable();
    lightbox();

    if (
      pixabayApiService.page * pixabayApiService.per_page >
      pixabayApiService.total
    ) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      // refs.loadMore.classList.add('is-hidden');
      loadMoreBtn.hide();
    }

    pixabayApiService.incrementPage();
  } catch (error) {
    console.log(error.message);
  }
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
