function begin() {
  var $name = $('#name');
  var $email = $('#email');
  var $password = $('#inputPassword');
  var $passwordAgain = $('#inputPasswordAgain');
  var $checkbox = $('#checkbox');
  var $gender = $('#sel1');
  var $submit = $('#submit');
  var $redirectorButton = $('#redirector-button');
  
  function isNameValid() {
  /* Usaremos una expresion regular para validar que escriba bien su nombre */
    var PATERNNAME = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/ ;
    return PATERNNAME.test($name.val());
  }
  
  function isEmailValid() {
    /* Usaremos una expresion regular para validar que escriba bien su correo*/
    var PATERNEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    return PATERNEMAIL.test($email.val());
  }

  function isPasswordAgainValid() {
    /* Usaremos una expresion regular para validar que escriba una contraseña segura*/
    var validation = $password.val();
    var validationAgain = $passwordAgain.val();

    /* Utilizamos este metodo para traer el valor validation */
    var validation = window.localStorage.getItem('validation');
    if (validationAgain === validation) {
      return true;
    }
  }

  function isGenderValid() {
    /* Si hay valor en el elemento select se muestra true */
    if ($gender.val()) {
      return true;
    }
  }

  function areAllValidationsPassing() {  
    return isNameValid() && isEmailValid() && isPasswordAgainValid() && isGenderValid();
  }

  function formStateEvent() {
    $submit.prop('disabled', !areAllValidationsPassing());
  }
  
  function redirectSight() {
    window.location.assign('plays.html');
  }
  
  /* Hacemos focus al input name */
  $name.focus();

  $name
    .focus(isNameValid)
    .on('keyup', isNameValid)
    .on('keyup', formStateEvent);
  
  $email
    .focus(isEmailValid)
    .on('keyup', isEmailValid)
    .on('keyup', formStateEvent);

  $passwordAgain
    .focus(isPasswordAgainValid)
    .on('keyup', isPasswordAgainValid)
    .on('keyup', formStateEvent);

  $gender
    .on('change', isGenderValid)
    .on('change', formStateEvent);
    
  $checkbox
    .on('click', formStateEvent);
  
  $submit
    .on('click', redirectSight);
    
  formStateEvent();
}
  
$(document).ready(begin);