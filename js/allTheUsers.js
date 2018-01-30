$(document).ready(function() {
  $containerGamers = $('#container-gamers');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {    
      firebase.database().ref('bd').
        on('child_added', function(s) {
          var user = s.val();
          var allGamersCode = s.ref.key;
          $('#container-gamers').append('<div data-code="' + allGamersCode + '" id="code-gamers"  class="col-xs-12 col-sm-12 col-md-2 col-lg-1">' + 
          '<img class="profile img-responsive img-circle center-block" src=\'' + user.photo.urlImage + '\' />' + '</div>' + '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-9">' + 
          '<h4 class="user-name color col-xs-12 col-sm-12 col-md-12 col-lg-10">' + user.name + '</h4>' + 
          '<p class="user-name color col-xs-12 col-sm-12 col-md-12 col-lg-10">' + user.phrase + '</p>' + '</div>');

          $('#container-gamers #code-gamers').on('click', function(event) {
            var anotherGamerPlace = $(this).data('code');
            window.localStorage.setItem('another-gamer-code', anotherGamerPlace);
            window.location.assign('anotherGamer.html');
          });
        });
    } else {
      // No user is signed in.
    }
  });
});