/* global _:readonly */
import thumbnail from './thumbnail.js';
import {modal} from './modal.js';
import bigPicture from'./big-picture.js';
import {form} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filter} from './filter.js';
import picturePreview from './picture-preview.js';

const RERENDER_DELAY = 500;

getData((photoArray) => {
  thumbnail(photoArray);
  filter(_.debounce(
    () => thumbnail(photoArray),
    RERENDER_DELAY,
  ));
  bigPicture('.picture>.picture__img', photoArray);
  modal('.pictures>.picture', '.big-picture', '.big-picture__cancel');
}, (message) => showAlert(message));

modal('#upload-file', '.img-upload__overlay', '.img-upload__cancel');
form();
picturePreview();











