const thumbnail = function (photoArray) {
  const thumbnailContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photoArrayFragment = document.createDocumentFragment();

  photoArray.forEach(({id, url, likes, comments}) => {
    const photoElement = thumbnailTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__img').id = id;
    photoArrayFragment.append(photoElement);
  });

  thumbnailContainer.append(photoArrayFragment);
}

export default thumbnail;
