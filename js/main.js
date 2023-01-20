import {creatingArrayPhotos} from './data.js';
import thumbnail from './thumbnail.js';
import modal from './modal.js';
import bigPicture from'./big-picture.js';
import {form} from './form.js';

const photoArray = creatingArrayPhotos();
thumbnail(photoArray);
modal('.pictures>.picture', '.big-picture', '.big-picture__cancel');
bigPicture('.picture>.picture__img', photoArray);

modal('#upload-file', '.img-upload__overlay', '.img-upload__cancel');
form();












