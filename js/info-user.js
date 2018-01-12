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
    var name = $name.val();
    localStorage.setItem('name', name);

    return PATERNNAME.test($name.val());
  }
  
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

  function isGenderValid() {
    /* Si hay valor en el elemento select se muestra true */
    var gender = $gender.val();
    localStorage.setItem('gender', gender);

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
    window.location.assign('login.html');
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
    .on('keyup', isPasswordAgainValid);

  $gender
    .on('change', isGenderValid);
    
  $checkbox
    .on('click', formStateEvent);
  
  $submit
    .on('click', redirectSight);
    
  formStateEvent();
}
  
$(document).ready(begin);