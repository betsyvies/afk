$(document).ready(function() {
  /* Al dar click en el button sing up nos redireccionará a la vista form */
  $('#sing-up').click(function() {
    window.location.assign('info-user.html');
  });
  
  /* Al dar click en el button login nos redireccionará a la vista login */
  $('#log-in').click(function() {
    window.location.assign('login.html');
  });
});