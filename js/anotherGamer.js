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
    window.location.assign('anotherVideos.html');
  });
  
  $buttonImages.on('click', function() {
    window.location.assign('anotherImages.html');
  });
});