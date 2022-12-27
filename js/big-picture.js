const bigPicture = (thumbnailTriggers, photoArray) => {
  const thumbnailPhotos = document.querySelectorAll(thumbnailTriggers);
  const bigPictureContainer = document.querySelector('.big-picture');
  const bigPictureCommentContainer = document.querySelector('.social__comments');

  const showBigImage = (bigPictureContainer, photoData) => {
    bigPictureContainer.querySelector('.big-picture__img>img').src = photoData.url;
    bigPictureContainer.querySelector('.likes-count').textContent = photoData.likes;
    bigPictureContainer.querySelector('.comments-count').textContent = photoData.comments.length;
    const bigPictureCommentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');
    const bigPictureCommentFragment = document.createDocumentFragment();

    photoData.comments.forEach(({avatar, message, name}) => {
      const commentElem = bigPictureCommentTemplate.cloneNode(true);
      commentElem.querySelector('.social__picture').src = avatar;
      commentElem.querySelector('.social__picture').alt = name;
      commentElem.querySelector('.social__text').textContent = message;

      bigPictureCommentFragment.append(commentElem);
    });

    bigPictureCommentContainer.append(bigPictureCommentFragment);

    bigPictureContainer.querySelector('.social__caption').textContent = photoData.description;
    bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  }

  thumbnailPhotos.forEach((photo) => {
    photo.addEventListener('click', (evt) => {
      photoArray.forEach((photoData) => {
        if (photoData.id === parseInt(evt.target.id)) {
          showBigImage(bigPictureContainer, photoData);
        }
      });
    });

    photo.parentNode.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        photoArray.forEach((photoData) => {
          if (photoData.id === parseInt(evt.target.children[0].id)) {
            showBigImage(bigPictureContainer, photoData);
          }
        });
      }
    });
  });
}

export default bigPicture;
