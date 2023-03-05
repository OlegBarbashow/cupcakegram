const ALERT_SHOW_TIME = 5000;

//  Тасование массива Фишера — Йетса
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomNumber = function (from, to) {
  if (from < 0 || to < 0) {
    return 'Range can only be positive';
  } else if (to < from || from === to) {
    return '"to" value must be more then "from" value'
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(min, max);

    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Iterate over all numbers from the range from ${min} to ${max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayValue = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomArrayValues = (array, from, to) => {
  let string = '';
  let number = getRandomNumber(from, to);
  while (number > 0) {
    string += array[getRandomNumber(0, array.length - 1)];
    number--;
  }

  return string;
};

const isEscape = (evt) => {
  return evt.key === ('Escape' || 'Esc');
}

const isEnter = (evt) => {
  return evt.key === 'Enter';
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(
    () => {
      alertContainer.remove()
    }, ALERT_SHOW_TIME);
}



export {getRandomNumber, getRandomArrayValue, getRandomArrayValues, makeUniqueRandomIntegerGenerator, isEscape,
  isEnter, showAlert, shuffle};
