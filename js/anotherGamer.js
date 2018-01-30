$(document).ready(function() {
  var $buttonVideos = $('#button-videos');
  var $buttonImages = $('#button-images');
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var anotherGamerCode = window.localStorage.getItem('another-gamer-code');

      firebase.database().ref('bd').child(anotherGamerCode)
        .on('value', function(s) {
          var nameAnotherGamer = s.child('name').val();
          var photoAnotherGamer = s.child('photo').child('urlImage').val();
          var phraseAnotherGamer = s.child('phrase').val();
          var imagePostAnotherGamer = s.child('imgPost').val();
          var videoPostAnotherGamer = s.child('videoPost').val();

          /* Añadiendo información de los gamers */
          $('#image-user').attr('src', photoAnotherGamer);
          $('#name-profile').text(nameAnotherGamer);
          $('#span-phrase').text(phraseAnotherGamer);

          for (var key in imagePostAnotherGamer) {
            /* Para vista desktop */
            $('#container-images-desk').prepend(`
            <div class="container-img col-sm-4 col-lg-4">
            <h4 class="title-img">Rediseño reciente de Kassadin</h4>
            <img class="profile img-responsive" src='${imagePostAnotherGamer[key].url}' alt="jugada"/>
            </div>`);
          }

          for (var key in videoPostAnotherGamer) {
            /* Para vista desktop */
            $('#container-videos-desk').prepend(`
            <div class="container-video col-sm-4 col-lg-4">
            <h4 class="title-video">League of Legends</h4>
            <iframe class="video" src='${videoPostAnotherGamer[key].url}' frameborder="0" gesture="media" allow="encrypted-media"
              allowfullscreen></iframe>`);
          }
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

// chat code

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
  if (e.which == 13) {
    send();
  }
});