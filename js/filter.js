const filter = (cb) => {
  const imgFilterField = document.querySelector('.img-filters');
  const imgFilterButtons = document.querySelectorAll('.img-filters__button');
  const imgFiltersForm = document.querySelector('.img-filters__form');

  imgFilterField.classList.remove('img-filters--inactive');

  imgFilterButtons.forEach(buttonActive => {
    buttonActive.addEventListener('click', () => {
      imgFilterButtons.forEach(button => {
        button.classList.remove('img-filters__button--active');
      });

      imgFiltersForm.dataset.value = buttonActive.id;
      buttonActive.classList.add('img-filters__button--active');
      cb();
    });
  });
}

export {filter};
