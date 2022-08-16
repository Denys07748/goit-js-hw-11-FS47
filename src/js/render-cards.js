import getRefs from './get-refs';

const refs = getRefs();

export default function renderCards(data) {
  const marcup = data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</br>${likes}</b>
                </p>
                <p class="info-item">
                <b>Views</br>${views}</b>
                </p>
                <p class="info-item">
                <b>Comments</br>${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads</br>${downloads}</b>
                </p>
            </div>
        </div>`
  );

  refs.gallery.insertAdjacentHTML('beforeend', marcup);
}
