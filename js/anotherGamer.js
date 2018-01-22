$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var anotherGamerCode = window.localStorage.getItem('another-gamer-code');

      firebase.database().ref('bd').child(anotherGamerCode)
        .on('value', function(s) {
          var nameAnotherGamer = s.child('name').val();
          var photoAnotherGamer = s.child('photo').child('urlImage').val();
          var phraseAnotherGamer  = s.child('phrase').val();

          /* Añadiendo información de los gamers */
          $('#image-user').attr('src', photoAnotherGamer);
          $('#name-profile').text(nameAnotherGamer);
          $('#span-phrase').text(phraseAnotherGamer);
        });
    } else {
    // No user is signed in.
    }
  });
});