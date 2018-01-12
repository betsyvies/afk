$(document).ready(function() {
  var $name = $('#name-profile');

  var nameValidation = window.localStorage.getItem('name');

  $name.text(nameValidation);
});