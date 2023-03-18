const picturePreview = () => {
  const TYPE_FILES = ['gif', 'jpg', 'jpeg', 'png'];

  const fileChooser = document.querySelector('#upload-file');
  const preview = document.querySelector('.img-upload__preview > img');

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPE_FILES.some((it) => {
      return fileName.endsWith(it);
    })


    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  });
}

export default picturePreview;
