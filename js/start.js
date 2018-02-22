$(document).ready(function() {
  // Login
  var $loginBtn = $('#log-in');

  $loginBtn.on('click', googleLogin);

  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // The signed-in user info.
      var user = result.user;
      // Mostramos su contenido
      console.log(user);
      // Llamamos a la funcion
      saveData(result.user);

      window.location.assign('allTheUsers.html');
    });
  }

  function saveData(user) {
    var users = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
    firebase.database().ref('bd/' + user.uid).set(users);
  }
});
