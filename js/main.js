import {creatingArrayPhotos} from './data.js';
import thumbnail from './thumbnail.js';
import modal from './modal.js';
import bigPicture from'./big-picture.js';


const photoArray = creatingArrayPhotos();
thumbnail(photoArray);
modal('.pictures>.picture', '.big-picture', '.big-picture__cancel');
bigPicture('.picture>.picture__img', photoArray);












