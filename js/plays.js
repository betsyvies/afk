/* Ocultamos los contenedores de cambio */
var $changeName = $('#change-name');
var $profileUpdate = $('#profile-update');

$changeName.hide();
$profileUpdate.hide();

$(document).ready(function() {
  var $imgUser = $('#image-user');
  var $inputFile = $('#file');
  var $inputFileImages = $('#file-1');
  var $containerImgPost = $('#container-images-post');
  var $inputFileVideos = $('#file-2');
  var $containerVideosPost = $('#container-videos-post');
  var $name = $('#name-profile');
  var $inputName = $('#input-new-name');
  var $inputPhrase = $('#input');
  var $containerPhrase = $('#container-phrase');
  var $spanPhrase = $('#span-phrase');
  var $buttonIconPencilName = $('#button-icon-pencil-name');
  var $buttonIconPencilPhrase = $('#button-icon-pencil-phrase');
  var $buttonIcon = $('#button-icon');
  var $buttonIconName = $('#button-icon-name');
  var $buttonVideos = $('#button-videos');
  var $buttonImages = $('#button-images');

  /* Obtención del usuario actual */

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      var nameUser = user.displayName;
      var photoUser = user.photoURL;

      $imgUser.attr('src', photoUser);
      $name.text(nameUser);

      firebase.database().ref('bd').child(codeUser)
        .on('value', function(s) {
          var updatingName = s.child('name').val();
          if (updatingName) {
            $name.text(updatingName);
          }

          var updatingPhrase = s.child('phrase').val();
          if (updatingPhrase) {
            $spanPhrase.text(updatingPhrase);
          }
        });

      // Ocultamos el boton de cambio y mostramos el input
      $buttonIconPencilName.on('click', function(event) {
        $changeName.show();
        $buttonIconPencilName.hide();
      });

      /* Con esta funcion actualizamos los cambios del nombre en firebase */
      $buttonIconName.on('click', function(event) {
        // validando que el input no este vacio ni con solo espacios
        if ($inputName .val() && $inputName .val() !== 0) {
          var newName = $inputName.val();
          firebase.database().ref('bd').child(codeUser).child('name')
            .set(newName);
        }
        $changeName.hide();
        $buttonIconPencilName.show();
        $inputName.val('');
      });

      $buttonIconPencilPhrase.on('click', function(event) {
        $profileUpdate.show();
        $buttonIconPencilPhrase.hide();
      });

      /* Con esta funcion actualizamos los cambios de la frase en firebase */
      $buttonIcon.on('click', function(event) {
        if ($inputPhrase.val() && $inputPhrase.val() !== 0) {
          var newPhrase = $inputPhrase.val();
          firebase.database().ref('bd').child(codeUser).child('phrase')
            .set(newPhrase);
        }
        $profileUpdate.hide();
        $buttonIconPencilPhrase.show();
        $inputPhrase.val('');
      });

      /* Cambiaremos la foto de perfil del usuario */
      var storageRef = firebase.storage().ref();
      showProfileImage();

      $inputFile.on('change', function(event) {
        var profilePhotoToUpload = $(this).prop('files')[0];
        var uploadTask = storageRef.child('images/' + profilePhotoToUpload.name).put(profilePhotoToUpload);
        uploadTask.on('state_changed', function(s) {
          // mostrar barra de progreso
        },
        function(error) {
          alert('Hubo un error al subir la imagen');
        },
        function() {
          var downloadURL = uploadTask.snapshot.downloadURL;;
          createImageFirebaseNode(profilePhotoToUpload.name, downloadURL);
        });
      });

      function createImageFirebaseNode(photoName, url) {
        firebase.database().ref('bd').child(codeUser).child('photo')
          .child('urlImage').set(url)
          .child('nameImage').set(photoName);
      }

      function showProfileImage() {
        firebase.database().ref('bd').child(codeUser).child('photo').child('urlImage')
          .on('value', function(s) {
          // esto devuelve un array por eso se puede recorrer
            var myPhoto = s.val();
            if (myPhoto !== null) {
              $imgUser.attr('src', myPhoto);  
            }
          });
      }

      showProfileImagePost();

      function showProfileImagePost() {
        firebase.database().ref('bd').child(codeUser).child('imgPost')
          .on('value', function(s) {
            var data = s.val();
            $containerImgPost.html('');
            for (var key in data) {
              $containerImgPost.prepend(`
              <div class="container-img col-sm-4 col-lg-4">
              <h4 class="title-img">Rediseño reciente de Kassadin</h4>
              <img class="profile img-responsive" src='${data[key].url}' alt="jugada"/>
              </div>`);
            }
          });
      }

      /* Con esta funcion subiremos imagenes a storage de firebase */
      $inputFileImages.on('change', function() {
        var imageUpload = $(this).prop('files')[0];

        var uploadTask = storageRef.child('imagesPost/' + imageUpload.name).put(imageUpload);
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

      
      showProfileVideosPost();

      function showProfileVideosPost() {
        firebase.database().ref('bd').child(codeUser).child('videoPost')
          .on('value', function(s) {
            var data = s.val();
            $containerVideosPost.html('');
            for (var key in data) {
              $containerVideosPost.prepend(`
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

  /* Este evento sirve para ir a las vista videos o images */

  $buttonVideos.on('click', function() {
    window.location.assign('videos.html');
  });

  $buttonImages.on('click', function() {
    window.location.assign('images.html');
  });
});