$(document).ready(function() {
  var $name = $('#name-profile');
  var $inputPhrase = $('#input');
  var $containerPhrase = $('#container-phrase');
  var $spanPhrase = $('#span-phrase');
  var $buttonIcon = $('#button-icon');
  var $buttonVideos = $('#button-videos');
  var $buttonImages = $('#button-images');
   
  /* Agregamos el name con el que el usuario se registro */
  var nameValidation = window.localStorage.getItem('name');

  $name.text(nameValidation);

  /* Este evento sirve para cambiar la frase al gusto de el */
  $inputPhrase.on('keyup', function() {
    event.preventDefault();
    var phrase = $(this).val();
    $containerPhrase.attr('data-phrase', phrase);
  });

  $buttonIcon.on('click', function() {
    var dataPhrase = $containerPhrase.attr('data-phrase'); 

    $spanPhrase.text(dataPhrase);
    $inputPhrase.val('');
  });

  $buttonVideos.on('click', function() {
    window.location.assign('videos.html');
  });

  $buttonImages.on('click', function() {
    window.location.assign('images.html');
  });
});