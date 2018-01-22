function begin() {
  var $email = $('#email');
  var $password = $('#inputPassword');
  var $passwordAgain = $('#inputPasswordAgain');
  var $submit = $('#submit');
   
  function isEmailValid() {
    /* Usaremos una expresion regular para validar que escriba bien su correo*/
    var PATERNEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    var email = $email.val();
    localStorage.setItem('email', email);
    
    return PATERNEMAIL.test($email.val());
  }

  function isPasswordAgainValid() {
    /* Validamos que la contraseña sea la misma*/
    var validation = $password.val();
    console.log($password.val());

    var validationAgain = $passwordAgain.val();
    localStorage.setItem('validation', validation);

    if (validationAgain === validation) {
      return true;
    }
  }

  function areAllValidationsPassing() {  
    return isEmailValid() && isPasswordAgainValid();
  }

  function formStateEvent() {
    $submit.prop('disabled', !areAllValidationsPassing());
  }
  
  function redirectSight() {
    window.location.assign('login.html');
  }
  
  /* Hacemos focus al input email */
  $email.focus();

  $email
    .focus(isEmailValid)
    .on('keyup', isEmailValid)
    .on('keyup', formStateEvent);

  $passwordAgain
    .focus(isPasswordAgainValid)
    .on('keyup', isPasswordAgainValid);
 
  $submit
    .on('click', redirectSight);
    
  formStateEvent();
}
  
$(document).ready(begin);