function previewFile() {
  var video = document.querySelector('iframe');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  
  reader.onloadend = function() {
    var attrSrcVideo = reader.result;
    video.src = attrSrcVideo;
    console.log(reader.result);
  
    /* Guardamos el resultado  en la base local */
    localStorage.setItem('attrSrcVideo', attrSrcVideo);
  };
  
  if (file) {
    reader.readAsDataURL(file);
  } else {
    video.src = '';
  }
}
  
$(document).ready(function() {
  $video = $('#video');
  $buttonVideo = $('button-icon-video');
  $titleVideoView = $('#title-video-view');
  
  /* Hacemos uso de la data attrSrc, para guardar la imagen  */
  var attrSrcValidationVideo = window.localStorage.getItem('attrSrcVideo');
  $video.attr('src', attrSrcValidationVideo);
  
  $buttonVideo.on('click', function() {
    $inputVideo = $('#input-title-video');
    $titleVideoView = $('#title-video-view');
  
    var title = $inputVideo.val();
  
    $titleVideoView.text(title);
    
    /* Guardamos el title en la base local */
    localStorage.setItem('title', title);
  });
  
  /* Hacemos uso de la data title */
  var titleValidation = window.localStorage.getItem('title');
  
  $titleImageView.text(titleValidation);
});