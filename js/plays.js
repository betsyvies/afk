/* Ocultamos los contenedores de cambio */
var $changeName = $('#change-name');
var $profileUpdate = $('#profile-update');

$changeName.hide();
$profileUpdate.hide();

$(document).ready(function() {
  var $imgUser = $('#image-user');
  var $name = $('#name-profile');
  var $inputName = $('#input-new-name');
  var $inputPhrase = $('#input');
  var $containerPhrase = $('#container-phrase');
  var $spanPhrase = $('#span-phrase');
  var $buttonIconPencilName = $('#button-icon-pencil-name');
  var $buttonIconPencilPhrase = $('#button-icon-pencil-phrase');
  var $buttonIcon = $('#button-icon');
  var $buttonIconName = $('#button-icon-name');
  var $buttonVideos = $('#button-videos');
  var $buttonImages = $('#button-images');

  /* Obtención del usuario actual */

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      var nameUser = user.displayName;
      var photoUser = user.photoURL;

      $imgUser.attr('src', photoUser);
      $name.text(nameUser);

      firebase.database().ref('bd').child(codeUser)
        .on('value', function(s) {
          var updatingName = s.child('name').val();
          if (updatingName) {
            $name.text(updatingName);
          }

          var updatingPhrase = s.child('phrase').val();
          if (updatingPhrase) {
            $spanPhrase.text(updatingPhrase);
          }
        });

      // Ocultamos el boton de cambio y mostramos el input
      $buttonIconPencilName.on('click', function(event) {
        $changeName.show();
        $buttonIconPencilName.hide();
      });

      /* Con esta funcion actualizamos los cambios del nombre en firebase */
      $buttonIconName.on('click', function(event) {
        // validando que el input no este vacio ni con solo espacios
        if ($inputName .val() && $inputName .val() !== 0) {
          var newName = $inputName.val();
          firebase.database().ref('bd').child(codeUser).child('name')
            .set(newName);
        }
        $changeName.hide();
        $buttonIconPencilName.show();
        $inputName.val('');
      });

      $buttonIconPencilPhrase.on('click', function(event) {
        $profileUpdate.show();
        $buttonIconPencilPhrase.hide();
      });

      /* Con esta funcion actualizamos los cambios de la frase en firebase */
      $buttonIcon.on('click', function(event) {
        if ($inputPhrase.val() && $inputPhrase.val() !== 0) {
          var newPhrase = $inputPhrase.val();
          firebase.database().ref('bd').child(codeUser).child('phrase')
            .set(newPhrase);
        }
        $profileUpdate.hide();
        $buttonIconPencilPhrase.show();
        $inputPhrase.val('');
      });
    } else {
      // No user is signed in.
    }
  });

  /* Este evento sirve para ir a las vista videos o images */

  $buttonVideos.on('click', function() {
    window.location.assign('videos.html');
  });

  $buttonImages.on('click', function() {
    window.location.assign('images.html');
  });
});

/* Chat code */

$(document).on('click', '.panel-heading span.icon_minim', function(e) {
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
$(document).on('focus', '.panel-footer input.chat_input', function(e) {
  var $this = $(this);
  if ($('#minim_chat_window').hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideDown();
    $('#minim_chat_window').removeClass('panel-collapsed');
    $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
  }
});
$(document).on('click', '#new_chat', function(e) {
  var size = $('.chat-window:last-child').css('margin-left');
  size_total = parseInt(size) + 400;
  alert(size_total);
  var clone = $('#chat_window_1').clone().appendTo('.container');
  clone.css('margin-left', size_total);
});
$(document).on('click', '.icon_close', function(e) {
  // $(this).parent().parent().parent().parent().remove();
  $('#chatbox').hide();
});

// send function start

function send() {
  var chat = $('#btn-input').val();
  var dt = new Date();
  var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

  if (chat == '') {
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
  $(body).appendTo('#messagebody');
  $('#btn-input').val('');
  $('#messagebody').animate({ scrollTop: $('#messagebody')[0].scrollHeight }, 'slow');
}


// send function end


$('#btn-chat').click(function() {
  send();
});

$('#btn-input').keypress(function(e) {
  if (e.which === 13) {
    send();
  }
});