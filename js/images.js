function previewFile() {
  var preview = document.querySelector('img');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function() {
    var attrSrc = reader.result;
    preview.src = attrSrc;
    console.log(reader.result);

    /* Guardamos el resultado  en la base local */
    localStorage.setItem('attrSrc', attrSrc);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

$(document).ready(function() {
  $image = $('#image');
  $buttonImage = $('#button-icon-image');
  $titleImageView = $('#title-image-view');

  /* Hacemos uso de la data attrSrc, para guardar la imagen  */
  var attrSrcValidation = window.localStorage.getItem('attrSrc');
  $image.attr('src', attrSrcValidation);

  /* Este evento sirve para cambiar la frase al gusto de el */
  $inputImage.on('keyup', function() {
    event.preventDefault();
    var title = $(this).val();
    $titleImageView.attr('data-title', title);

    /* Guardamos el title en la base local */
    localStorage.setItem('title', title);
  });
  
  $buttonImage.on('click', function() {
    var dataTitle = $titleImageView.attr('data-title');
  
    $titleImageView.text(dataTitle);
    $inputImage.val('');
  });

  /* Hacemos uso de la data title */
  var titleValidation = window.localStorage.getItem('title');

  $titleImageView.text(titleValidation);
});