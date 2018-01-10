$(document).ready(function() {
  var $consoleGamer = $('#console-gamer');
  var $pcGamer = $('#pc-gamer');
  var $mobileGamer = $('#mobile-gamer');

  $consoleGamer.on('click', function() {
    window.location.assign('plays.html');
    localStorage.setItem('raza', console-gamer);
  });

  $pcGamer.on('click', function() {
    window.location.assign('plays.html');
    localStorage.setItem('raza', pc-gamer);
  });

  $mobileGamer.on('click', function() {
    window.location.assign('plays.html');
    localStorage.setItem('raza', mobile-gamer);
  });
});