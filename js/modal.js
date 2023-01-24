import calcScroll from './calcScroll.js';
import {isEscape, isEnter} from './util.js';
import {clearInputs} from './form.js';

const modal = (triggersSelector, modalSelector, closeSelector) => {
  const triggers = document.querySelectorAll(triggersSelector);
  const modal = document.querySelector(modalSelector);
  const close = document.querySelector(closeSelector);
  const scroll = calcScroll();

  const onPopupEscapePress = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = '0px';
    }
  }
  const openModal = (evt) => {
    evt.preventDefault();
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.body.style.marginRight = `${scroll}px`;

    document.addEventListener('keydown', onPopupEscapePress);
  }

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.body.style.marginRight = '0px';

    document.removeEventListener('keydown', onPopupEscapePress);
    clearInputs();
  }

  triggers.forEach((trigger) =>{

    if (trigger.type === 'file') {
      trigger.addEventListener('change', (evt) => {
        openModal(evt);
      });
    } else {
      trigger.addEventListener('keydown', (evt) => {
        if (isEnter(evt)) {
          openModal(evt);
        }
      });

      trigger.addEventListener('click', (evt) => {
        openModal(evt);
      });
    }
  });

  close.addEventListener('click', () => {
    closeModal();
  });

  close.addEventListener('keydown', (evt) => {
    if (isEnter(evt)) {
      closeModal();
    }
  });

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  });

};

export default modal;
