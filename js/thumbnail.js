import {shuffle} from './util.js';

const thumbnail = function (photoArray) {
  const THUMBNAIL_COUNT = 10;

  const thumbnailContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const photoArrayFragment = document.createDocumentFragment();

  const sortByComments = (commentA, commentB) => {
    const numberCommentsA = commentA.comments.length;
    const numberCommentsB = commentB.comments.length;
    return numberCommentsB - numberCommentsA;
  }

  const clearThumbnailContainer = () => {
    const thumbnails = thumbnailContainer.querySelectorAll('.picture');
    thumbnails.forEach(thumbnail => thumbnail.remove());
  }

  const filterArray = () => {
    const imgFiltersForm = document.querySelector('.img-filters__form');
    if (imgFiltersForm.dataset.value === 'filter-default') {
      return photoArray;
    } else if (imgFiltersForm.dataset.value === 'filter-random') {
      return shuffle(photoArray.slice()).slice(0, THUMBNAIL_COUNT);
    } else if (imgFiltersForm.dataset.value === 'filter-discussed') {
      return photoArray
        .slice()
        .sort(sortByComments);
    } else {
      return photoArray;
    }
  }

  photoArray = filterArray();

  photoArray
    .forEach(({id, url, likes, comments}) => {
      const photoElement = thumbnailTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      photoElement.querySelector('.picture__img').id = id;
      photoArrayFragment.append(photoElement);
    });

  clearThumbnailContainer();
  thumbnailContainer.append(photoArrayFragment);
}

export default thumbnail;
