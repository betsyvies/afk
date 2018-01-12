$(document).ready(function() {
  $buttonGame = $('#button-game');

  $buttonGame.on('click', function() {
    $containerComment = $('#container-comment');
    $comment = $('#comment');

    var publication = $comment.val();
    var hour = moment().format('LT');

    /* Guardamos la publicación y la hora en la base local */
    localStorage.setItem('publication', publication);
    localStorage.setItem('hour', hour);

    /* Hacemos uso de la data, para publicar */
    var publicationValidation = window.localStorage.getItem('publication');
    var hourValidation = window.localStorage.getItem('hour');

    $containerComment.append('<div class="col-xs-12 container-user">' + 
    '<div id="container-icon-user" class="col-xs-3 container-user">' +
      '<i class="fa fa-user-circle-o user-icon" aria-hidden="true"></i>' +
    '</div>' +
    '<div id="container-publication" class="col-xs-9 container-user">' +
      '<p id="publication-day" class="text">' + publicationValidation + '</p>' +
      '<p class="text">' + hourValidation + '</p>' +
      '</div>' +
    '</div>');

    $comment.val('');
  });
});
