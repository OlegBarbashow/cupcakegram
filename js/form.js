import {isEscape} from './util.js';

const form = () => {
  const smallerButton = document.querySelector('.scale__control--smaller'),
    biggerButton = document.querySelector('.scale__control--bigger'),
    sizeField = document.querySelector('.scale__control--value'),
    imageUploadPreview = document.querySelector('.img-upload__preview img'),
    hashtagsInput = document.querySelector('.text__hashtags'),
    imageDescriptionInput = document.querySelector('.text__description');

  const editImageScale = () => {
    smallerButton.addEventListener('click', () => {
      if (parseInt(sizeField.value) !== 25) {
        sizeField.value = parseInt(sizeField.value) - 25 + '%';
      }
      imageUploadPreview.style.transform = 'scale(' + parseInt(sizeField.value) / 100 + ')';
    });

    biggerButton.addEventListener('click', () => {
      if (parseInt(sizeField.value) !== 100) {
        sizeField.value = parseInt(sizeField.value) + 25 + '%';
      }
      imageUploadPreview.style.transform = 'scale(' + parseInt(sizeField.value) / 100 + ')';
    });
  }


  const imageInfoValidation = () => {
    let hashTagsErrors = ['','','','',''];
    hashtagsInput.addEventListener('input', () => {
      if (hashtagsInput.value) {
        const hashTagsStr = hashtagsInput.value.replace(/\s{2,}/gu, ' ').trim();
        const hashTags = hashTagsStr.split(/\s/g);

        hashTags.forEach((tag, i, tags) => {
          if (tag === '') {
            delete tags[i];
          }
        });

        const regLattice = /^#/;
        const oneLattice = /#$/;
        const regLettersNumbers = /^#[a-zA-Z0-9а-яА-ЯёЁ]+$/ig;
        const maxLength = /^#[a-zA-Z0-9а-яА-ЯёЁ]{20}/ig;

        hashTags.forEach((item, index) => {
          const duplicates = hashTags.filter((tag, index, tags) => {
            return tags.indexOf(tag.toLowerCase()) !== index;
          });

          if (!item.match(regLattice)) {
            if (hashTagsErrors[index].indexOf('хэш-тег начинается с символа # (решётка);') === -1) {
              hashTagsErrors[index] += 'хэш-тег начинается с символа # (решётка);';
            }
          } else if (hashTags.length > 5) {
            let result = hashTagsErrors.some((item) => {
              return item.indexOf('нельзя указать больше пяти хэш-тегов;') !== -1;
            });
            if (!result) {
              hashTagsErrors[index] += 'нельзя указать больше пяти хэш-тегов;';
            }
          } else if (item.match(oneLattice)) {
            if (hashTagsErrors[index].indexOf('хеш-тег не может состоять только из одной решётки;') === -1) {
              hashTagsErrors[index] += 'хеш-тег не может состоять только из одной решётки;';
            }
          } else if (!item.match(regLettersNumbers)) {
            if (hashTagsErrors[index].indexOf('строка после решётки должна состоять из букв и чисел и не может' +
              ' содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),' +
              ' эмодзи и т. д.;') === -1) {
              hashTagsErrors[index] += 'строка после решётки должна состоять из букв и чисел и не может' +
                ' содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),' +
                ' эмодзи и т. д.;';
            }
          } else if (item.match(maxLength)) {
            if (hashTagsErrors[index].indexOf('максимальная длина одного хэш-тега 20 символов, включая решётку;') === -1) {
              hashTagsErrors[index] += 'максимальная длина одного хэш-тега 20 символов, включая решётку;';
            }
          } else if (duplicates.length) {
            let result = hashTagsErrors.some((item) => {
              return item.indexOf('хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;' +
                'один и тот же хэш-тег не может быть использован дважды;') !== -1;
            });
            if (!result) {
              hashTagsErrors[index] += 'хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;' +
                'один и тот же хэш-тег не может быть использован дважды;';
            }
          } else {
            // console.log(hashTagsErrors);
            // console.log(hashTags);
            hashTagsErrors[index] = hashTagsErrors[index].replace('нельзя указать больше пяти хэш-тегов;', '');
            hashTagsErrors[index] = hashTagsErrors[index].replace('хэш-тег начинается с символа # (решётка);', '');
            hashTagsErrors[index] = hashTagsErrors[index].replace('хеш-тег не может состоять только из одной решётки;', '');
            hashTagsErrors[index] = hashTagsErrors[index].replace('строка после решётки должна состоять из букв и чисел и не может' +
              ' содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),' +
              ' эмодзи и т. д.;', '');
            hashTagsErrors[index] = hashTagsErrors[index]
              .replace('максимальная длина одного хэш-тега 20 символов, включая решётку;', '');
            hashTagsErrors[index] = hashTagsErrors[index].replace('хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;' +
              'один и тот же хэш-тег не может быть использован дважды;', '');
          }
        });

        hashTagsErrors.forEach((tagError, index) => {
          if (hashTags[index] === undefined) {
            hashTagsErrors[index] = '';
          }
        });

        let hashTagsErrors2 = hashTagsErrors.filter(function (el) {
          return (el != null && el !== '' || el === 0);
        });

        if (hashTagsErrors2) {
          hashtagsInput.setCustomValidity(hashTagsErrors2.join());
        } else {
          hashtagsInput.setCustomValidity('');
        }
        hashtagsInput.reportValidity();

      }
    });

    hashtagsInput.addEventListener('keyup', (evt) => {
      if (evt.code === 'Backspace' && evt.target.value.length === 0) {
        hashtagsInput.setCustomValidity('');
        hashtagsInput.reportValidity();
      }
    });

    hashtagsInput.addEventListener('keydown', (evt) => {
      if (isEscape(evt)) {
        evt.stopPropagation();
      }
    });
  }

  editImageScale();
  imageInfoValidation();
}

const clearInputs = () => {
  const inputs = document.querySelectorAll('#upload-file'),
    textarea = document.querySelectorAll('textarea');

  inputs.forEach(item => {
    item.value = '';
  });

  textarea.forEach(item => {
    item.value = '';
  });
}

export {form, clearInputs};
