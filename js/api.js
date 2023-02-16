const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Some problems with images loading');
      }
    })
    .then((photoArray) => {
      onSuccess(photoArray);
    })
    .catch(() => {
      onFail('Some problems with images loading');
    });
}

const setData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Some problems with image loading');
      }
    })
    .catch(() => {
      onFail('Some problems with image loading');
    });
}

export {getData, setData};
