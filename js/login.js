function begin() {
  var $access = $('#access'); 
  var $emailAccess = $('#inputEmail');
  var $passwordAccess = $('#inputPassword');
  
  function isEmail() {
    /* Validamos que la contraseña sea la misma*/
    var emailValidation = window.localStorage.getItem('email');
    var emailValue = $emailAccess.val();
    console.log(emailValue);

    console.log(emailValidation);
    if (emailValue === emailValidation) {
      return true;
    }
  }

  function isPassword() {
    /* Validamos que la contraseña sea la misma*/
    var passwordValidation = window.localStorage.getItem('validation');
    var passwordValue = $passwordAccess.val();
    if (passwordValue === passwordValidation) {
      return true;
    }
  }

  function areAllValidationsPassing() {  
    return isEmail() && isPassword();
  }

  function formStateEvent() {
    $access.prop('disabled', !areAllValidationsPassing());
  }
  
  function redirectSight() {
    window.location.assign('plays.html');
    alert('¡Bienvenido a la red más grande de gamers!');
  }
  
  /* Hacemos focus al input name */
  $emailAccess.focus();

  $emailAccess
    .focus(isEmail)
    .on('keyup', isEmail)
    .on('keyup', formStateEvent);

  $passwordAccess
    .focus(isPassword)
    .on('keyup', isPassword)
    .on('keyup', formStateEvent);

  $access
    .on('click', redirectSight);
    
  formStateEvent();
}
  
$(document).ready(begin);