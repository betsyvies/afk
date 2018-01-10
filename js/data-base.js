$(document).ready(function() {
  var $redirectorButton = $('#redirector-button'); 
  $redirectorButton.on('click', function() {
  // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyCq-aTRPC94e5Hv-zUk3jVH39BF1huXQKE',
      authDomain: 'always-for-komrads.firebaseapp.com',
      databaseURL: 'https://always-for-komrads.firebaseio.com',
      projectId: 'always-for-komrads',
      storageBucket: 'always-for-komrads.appspot.com',
      messagingSenderId: '81850384224'
    };
    firebase.initializeApp(config);

    var email = $('#email').val();
    var password = $('#inputPassword').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    // ...
    });
  });
});