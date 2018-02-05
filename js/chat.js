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

/* Función que muestra los mensajes */

$(document).ready(function() {
  $buttonChat = $('#btn-chat');
  $containerMessage = $('#messagebody');
  $chatInput = $('#btn-input');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;

      $buttonChat.on('click', function(event) {
        if ($chatInput.val() && $chatInput.val() !== 0) {
          var message = $chatInput.val();
          var hour = moment().format('LT');

          firebase.database().ref('bd').child(codeUser).child('message').push({
            message: message,
            hour: hour
          });
        }
      });
      
      showMessage();

      function showMessage() {
        firebase.database().ref('bd').child(codeUser)
          .on('value', function(s) {
            var nameUser = s.child('name').val();
            var photoUser = s.child('photo').child('urlImage').val();
            var data = s.child('message').val();

            $containerMessage.html('');
            for (var key in data) {
              $containerMessage.append(`<div class="row msg_container base_sent">
              <div class="col-md-10 col-xs-10">
                <div class="messages msg_sent">
                  <p>${data[key].message}</p>
                  <time datetime="2009-11-13T20:00">${data[key].hour}. •${nameUser}</time>
                </div>
              </div>
              <div class="col-md-2 col-xs-2 avatar">
                <img src="${photoUser}" class="chatimg img-responsive">
              </div>
            </div>`);
            }
          });
      }
    } else {
      // No user is signed in.
    }
  });
});