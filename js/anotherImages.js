$(document).ready(function() {
  $containerImgPost = $('#container-images-post');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var anotherGamerCode = window.localStorage.getItem('another-gamer-code');

      firebase.database().ref('bd').child(anotherGamerCode)
        .on('value', function(s) {
          var imagePostAnotherGamer = s.child('imgPost').val();

          for (var key in imagePostAnotherGamer) {
            /* Para vista desktop */
            $containerImgPost.append(`
            <div class="container-img col-sm-4 col-lg-4">
            <h4 class="title-img">Rediseño reciente de Kassadin</h4>
            <img class="profile img-responsive" src='${imagePostAnotherGamer[key].url}' alt="jugada"/>
            </div>`);
          }
        });
    } else {
    // No user is signed in.
    }
  });
});