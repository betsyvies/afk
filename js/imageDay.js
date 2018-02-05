$(document).ready(function() {
  $inputFileImagesDay = $('#file-day');
  $containerImgDay = $('#container-image-day');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      
      showProfileImageDay();

      function showProfileImageDay() {
        firebase.database().ref('bd').child(codeUser).child('imgDay')
          .on('value', function(s) {
            var data = s.val();
            $containerImgDay.html('');
            for (var key in data) {
              $containerImgDay.prepend(`<img class="img-responsive img-circle image" src="${data[key].url}" alt="">`);
            }
          });
      }

      /* Con esta funcion subiremos imagenes a storage de firebase */
      $inputFileImagesDay.on('change', function() {
        var imageUpload = $(this).prop('files')[0];

        var uploadDay = firebase.storage().ref().child('imagesDay/' + imageUpload.name).put(imageUpload);
        uploadDay.on('state_changed', 
          function(s) {
          // mostrar barra de progreso
          },
          function(error) {
            alert('Hubo un error al subir la imagen');
          },
          function() {
            // Se mostrará cuando se ha subido exitosamente la imagen
            var downloadURL = uploadDay.snapshot.downloadURL;
            createImagePostFirebaseNode(imageUpload.name, downloadURL);
          });
      });
      
      function createImagePostFirebaseNode(nameImgDay, url) {
        firebase.database().ref('bd').child(codeUser).child('imgDay').push({
          name: nameImgDay,
          url: url
        });
      }
    } else {
      // No user is signed in.
    }
  });
});