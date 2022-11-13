import {getRandomNumber, getRandomArrayValue, getRandomArrayValues, makeUniqueRandomIntegerGenerator} from './util.js';

const SIMILAR_PHOTO_COUNT = 25;
const MIN_ID = 1;
const MAX_ID = 25;
const MIN_URL_NUMBER = 1;
const MAX_URL_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const getUniqueRandomId = makeUniqueRandomIntegerGenerator(MIN_ID, MAX_ID);
const getUniqueRandomUrl = makeUniqueRandomIntegerGenerator(MIN_URL_NUMBER, MAX_URL_NUMBER);
const getUniqueRandomCommentId = makeUniqueRandomIntegerGenerator(1, 1000);

const photoDescriptions = [
  'good shot',
  'great view',
  'my art',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Артем',
  'Иван',
  'Дима',
  'Маша',
  'Катя',
];

const createComments = () => {
  return {
    id: getUniqueRandomCommentId(),
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomArrayValues(messages, 1, 2),
    name: getRandomArrayValue(names),
  }
}

const createPhotoData = () => {
  return {
    id: getUniqueRandomId(),
    url: 'photos/' + getUniqueRandomUrl() +'.jpg',
    description: getRandomArrayValue(photoDescriptions),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: new Array(getRandomNumber(1, 10)).fill(null).map(() => createComments()),
  }
}

const creatingArrayPhotos = () => {
  return new Array(SIMILAR_PHOTO_COUNT).fill(null).map(() => createPhotoData());
}

export {creatingArrayPhotos};
