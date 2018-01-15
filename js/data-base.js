/* Hacemos un objeto para en el agregar el name, email, password y genero */
var user = {
  'gamer1': {

  }
};

var nameValidation = window.localStorage.getItem('name');
var emailValidation = window.localStorage.getItem('email');
var passwordValidation = window.localStorage.getItem('validation');
var genderValidation = window.localStorage.getItem('gender');
var razaValidation = window.localStorage.getItem('raza');

/* Con esta funcion agregamos elementos al objeto user */

user['gamer1']['name'] = nameValidation;
user['gamer1']['email'] = emailValidation;
user['gamer1']['password'] = passwordValidation;
user['gamer1']['gender'] = genderValidation;
user['gamer1']['raza'] = razaValidation;

console.log(user);
