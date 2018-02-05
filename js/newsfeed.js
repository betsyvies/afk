$(document).ready(function() {
  $buttonGame = $('#button-game');
  $containerComment = $('#container-comment');
  $comment = $('#comment');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;

      $buttonGame.on('click', function(event) {
        if ($comment.val() && $comment.val() !== 0) {
          var publication = $comment.val();
          var hour = moment().format('LT');

          firebase.database().ref('bd').child(codeUser).child('publication').push({
            publication: publication,
            hour: hour
          });
        }
      });
      
      showPublication();

      function showPublication() {
        firebase.database().ref('bd').child(codeUser)
          .on('value', function(s) {
            var nameUser = s.child('name').val();
            var photoUser = s.child('photo').child('urlImage').val();
            var data = s.child('publication').val();

            $containerComment.html('');
            for (var key in data) {
              $containerComment.prepend(`<div class="col-xs-12 container-user2 container-game">
              <div id="container-icon-user" class="col-xs-3 col-md-1 col-sm-3 col-lg-1 container-user container-game">
              <img class="profile img-responsive img-circle user-icon" src='${photoUser}'>
              </div>
              <div id="container-publication" class="col-xs-11 container-user">
              <p class="text name">${nameUser}</p>
              <p id="publication-day" class="text publication">${data[key].publication}</p>
              <p class="text hour">${data[key].hour}</p>
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