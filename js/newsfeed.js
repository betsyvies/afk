$(document).ready(function () {
  $buttonGame = $('#button-game');

  $buttonGame.on('click', function () {
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

//chat code

$(document).on('click', '.panel-heading span.icon_minim', function (e) {
  var $this = $(this);
  if (!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
  } else {
    $this.parents('.panel').find('.panel-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
  }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
  var $this = $(this);
  if ($('#minim_chat_window').hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideDown();
    $('#minim_chat_window').removeClass('panel-collapsed');
    $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
  }
});
$(document).on('click', '#new_chat', function (e) {
  var size = $(".chat-window:last-child").css("margin-left");
  size_total = parseInt(size) + 400;
  alert(size_total);
  var clone = $("#chat_window_1").clone().appendTo(".container");
  clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
  //$(this).parent().parent().parent().parent().remove();
  $("#chatbox").hide();
});

// send function start

function send() {
  var chat = $("#btn-input").val();
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

  if (chat == "") {
    alert('Enter Message');
  } else {
    var body = '<div class="row msg_container base_sent">' +
      '<div class="col-md-10 col-xs-10 ">' +
      '<div class="messages msg_sent">' +
      '<p>' + chat + '</p>' +
      ' <time datetime="2009-11-13T20:00">Gamer 1 • Today ' + time + '</time>' +
      '</div>' +
      '</div>' +
      '<div class="col-md-2 col-xs-2 avatar">' +
      '<img class="chatimg" src="../assets/images/perfil.jpg" class=" img-responsive ">' +
      '</div>' +
      '</div>';
  }
  $(body).appendTo("#messagebody");
  $('#btn-input').val('');
  $("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight }, 'slow');
}


// send function end




$("#btn-chat").click(function () {
  send()
});

$('#btn-input').keypress(function (e) {
  if (e.which == 13) {
    send()
  }
});