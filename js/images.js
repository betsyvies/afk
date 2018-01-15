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

  $buttonImage.on('click', function() {
    $inputImage = $('#input-title-image');
    $titleImageView = $('#title-image-view');

    var title = $inputImage.val();

    $titleImageView.text(title);
  
    /* Guardamos el title en la base local */
    localStorage.setItem('title', title);
  });

  /* Hacemos uso de la data title */
  var titleValidation = window.localStorage.getItem('title');

  $titleImageView.text(titleValidation);
});