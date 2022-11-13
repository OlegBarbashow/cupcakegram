import {creatingArrayPhotos} from './data.js';

const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoArray = creatingArrayPhotos();
const photoArrayFragment = document.createDocumentFragment();

photoArray.forEach(({url, likes, comments}) => {
  const photoElement = thumbnailTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoArrayFragment.append(photoElement);
});

thumbnailContainer.append(photoArrayFragment);
