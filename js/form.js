import {isEscape} from './util.js';
import {setData} from './api.js';
import {showAlert} from './util.js';
import {closeModal} from './modal.js'

const form = () => {
  const smallerButton = document.querySelector('.scale__control--smaller'),
    biggerButton = document.querySelector('.scale__control--bigger'),
    sizeField = document.querySelector('.scale__control--value'),
    imageUploadPreview = document.querySelector('.img-upload__preview img'),
    hashtagsInput = document.querySelector('.text__hashtags'),
    imageDescriptionInput = document.querySelector('.text__description'),
    effectsRadios = document.querySelectorAll('.effects__radio'),
    slideElement = document.querySelector('.effect-level__slider'),
    valueElement = document.querySelector('.effect-level__value'),
    imgUploadForm = document.querySelector('.img-upload__form');


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


  const hashTagsValidation = () => {
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

  const imageCommentValidation = () => {
    const lengthRule = /.{140}/gui;

    imageDescriptionInput.addEventListener('input', (evt) => {
      let descriptionValue = evt.target.value;
      if (descriptionValue.match(lengthRule)) {
        imageDescriptionInput.setCustomValidity('длина комментария не может составлять больше 140 символов;');
      } else {
        imageDescriptionInput.setCustomValidity('')
      }
      imageDescriptionInput.reportValidity();
    });

    imageDescriptionInput.addEventListener('keydown', (evt) => {
      if (isEscape(evt)) {
        evt.stopPropagation();
      }
    });
  }

  const overlayEffect = () => {
    imageUploadPreview.classList.add('effects__preview--none');

    noUiSlider.create(slideElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 80,
      step: 1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });

    slideElement.noUiSlider.on('update', (values, handle) => {
      valueElement.value = values[handle];
    });

    slideElement.style.display = 'none';

    for (let index = 0; index < effectsRadios.length; index++) {
      effectsRadios[index].addEventListener('change', (evt) => {
        if (evt.target.id !== 'effect-none') {
          slideElement.style.display = 'block';
        } else {
          slideElement.style.display = 'none';
        }

        switch (evt.target.id) {
          case 'effect-none':
            imageUploadPreview.classList.add('effects__preview--none');
            imageUploadPreview.style = 'filter: none';
            slideElement.noUiSlider.off('update');
            break;
          case 'effect-chrome':
            imageUploadPreview.classList.add('effects__preview--chrome');

            slideElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 1,
              },
              start: 1,
              step: 0.1,
            });

            slideElement.noUiSlider.on('update', (values, handle) => {
              imageUploadPreview.style = 'filter: grayscale(' + values[handle] + ')';
            });

            break;
          case 'effect-sepia':
            imageUploadPreview.classList.add('effects__preview--sepia');

            slideElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 1,
              },
              start: 1,
              step: 0.1,
            });

            slideElement.noUiSlider.on('update', (values, handle) => {
              imageUploadPreview.style = 'filter: sepia(' + values[handle] + ')';
            });

            break;
          case 'effect-marvin':
            imageUploadPreview.classList.add('effects__preview--marvin');

            slideElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 100,
              },
              start: 100,
              step: 1,
            });

            slideElement.noUiSlider.on('update', (values, handle) => {
              imageUploadPreview.style = 'filter: invert(' + values[handle] + '%)';
            });

            break;
          case 'effect-phobos':
            imageUploadPreview.classList.add('effects__preview--phobos');

            slideElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 3,
              },
              start: 3,
              step: 0.1,
            });

            slideElement.noUiSlider.on('update', (values, handle) => {
              imageUploadPreview.style = 'filter: blur(' + values[handle] + 'px)';
            });

            break;
          case 'effect-heat':
            imageUploadPreview.classList.add('effects__preview--heat');

            slideElement.noUiSlider.updateOptions({
              range: {
                min: 1,
                max: 3,
              },
              start: 3,
              step: 0.1,
            });

            slideElement.noUiSlider.on('update', (values, handle) => {
              imageUploadPreview.style = 'filter: brightness(' + values[handle] + ')';
            });

            break;
          default :
            imageUploadPreview.classList.add('effects__preview--none');
        }
      });
    }
  }

  editImageScale();
  overlayEffect();
  hashTagsValidation();
  imageCommentValidation();

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(imgUploadForm);

    setData(() => {
      closeModal('.img-upload__overlay');
    }, showAlert, formData);


  });
}

const clearInputs = () => {
  const inputs = document.querySelectorAll('.text__hashtags'),
    uploads = document.querySelectorAll('#upload-file'),
    textarea = document.querySelectorAll('textarea');

  inputs.forEach(item => {
    item.value = '';
  });

  uploads.forEach(item => {
    item.value = '';
  });

  textarea.forEach(item => {
    item.value = '';
  });
}

export {form, clearInputs};
