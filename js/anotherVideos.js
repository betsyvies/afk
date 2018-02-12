$(document).ready(function() {
  $containerVideosPost = $('#container-videos-post');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var anotherGamerCode = window.localStorage.getItem('another-gamer-code');
      console.log(anotherGamerCode);
      
      firebase.database().ref('bd').child(anotherGamerCode)
        .on('value', function(s) {
          var videoPostAnotherGamer = s.child('videoPost').val();
          console.log(videoPostAnotherGamer);

          for (var key in videoPostAnotherGamer) {
            /* Para vista desktop */
            $containerVideosPost.append(`
            <div class="container-video col-sm-4 col-lg-4">
            <iframe class="video" src='${videoPostAnotherGamer[key].url}' frameborder="0" gesture="media" allow="encrypted-media"
              allowfullscreen></iframe>`);
          }
        });
    } else {
    // No user is signed in.
    }
  });
});