$(document).ready(function() {
  $inputFileImages = $('#file-1');
  $containerImgPost = $('#container-images-post');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      
      showProfileImagePost();

      function showProfileImagePost() {
        firebase.database().ref('bd').child(codeUser).child('imgPost')
          .on('value', function(s) {
            var data = s.val();
            $containerImgPost.html('');
            for (var key in data) {
              $containerImgPost.append(`
              <div class="container-img col-sm-4 col-lg-4">
              <img class="profile img-responsive" src='${data[key].url}' alt="jugada"/>
              </div>`);
            }
          });
      }

      /* Con esta funcion subiremos imagenes a storage de firebase */
      $inputFileImages.on('change', function() {
        var imageUpload = $(this).prop('files')[0];

        var uploadTask = firebase.storage().ref().child('imagesPost/' + imageUpload.name).put(imageUpload);
        uploadTask.on('state_changed', 
          function(s) {
          // mostrar barra de progreso
          },
          function(error) {
            alert('Hubo un error al subir la imagen');
          },
          function() {
            // Se mostrará cuando se ha subido exitosamente la imagen
            var downloadURL = uploadTask.snapshot.downloadURL;
            createImagePostFirebaseNode(imageUpload.name, downloadURL);
          });
      });
      
      function createImagePostFirebaseNode(nameImgPost, url) {
        firebase.database().ref('bd').child(codeUser).child('imgPost').push({
          name: nameImgPost,
          url: url
        });
      }
    } else {
      // No user is signed in.
    }
  });
});