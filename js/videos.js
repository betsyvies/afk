$(document).ready(function() {
  $inputFileVideos = $('#file-1');
  $containerVideosPost = $('#container-videos-post');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      
      showProfileVideosPost();

      function showProfileVideosPost() {
        firebase.database().ref('bd').child(codeUser).child('videoPost')
          .on('value', function(s) {
            var data = s.val();
            $containerVideosPost.html('');
            for (var key in data) {
              $containerVideosPost.append(`
          <div class="container-video col-sm-4 col-lg-4">
          <h4 class="title-video">League of Legends</h4>
          <iframe class="video" src='${data[key].url}' frameborder="0" gesture="media" allow="encrypted-media"
            allowfullscreen></iframe>`);
            }
          });
      }

      /* Con esta funcion subiremos videos a storage de firebase */
      $inputFileVideos.on('change', function() {
        var videoUpload = $(this).prop('files')[0];

        var uploadTask = storageRef.child('videoPost/' + videoUpload .name).put(videoUpload);
        uploadTask.on('state_changed', 
          function(s) {
            // mostrar barra de progreso
          },
          function(error) {
            alert('Hubo un error al subir el video');
          },
          function() {
            // Se mostrará cuando se ha subido exitosamente la imagen
            var downloadURL = uploadTask.snapshot.downloadURL;
            createVideoPostFirebaseNode(videoUpload.name, downloadURL);
          });
      });

      function createVideoPostFirebaseNode(nameVideoPost, url) {
        firebase.database().ref('bd').child(codeUser).child('videoPost').push({
          name: nameVideoPost,
          url: url
        });
      }
    } else {
      // No user is signed in.
    }
  });
});