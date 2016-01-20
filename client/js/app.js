$(function () {

  var SERVER_URL = 'http://localhost:8181';
  var IMAGES_UPLOAD_URL = '/images/upload/';

  var $fileInputElement = $('input[type="file"]');
  var $uploadButtonElement = $('[data-upload-file-button]');

  $('form').on('submit', function handleFormSubmit(submitEvent) {
    submitEvent.preventDefault();

    $fileInputElement.simpleUpload(SERVER_URL + IMAGES_UPLOAD_URL, {
      start: function handleStart(file) {
        // Upload started

        $uploadButtonElement.prop('disabled', true);
      },

      progress: function handleProgress(progress) {
        // Received progress
      },

      success: function handleSuccess(data) {
        // Upload successful
        $uploadButtonElement.prop('disabled', false);

        $('[data-uploaded-image]').attr('src', SERVER_URL + '/uploads/' + data.file.filename);
      },

      error: function handleError(error) {
        // Upload failed

        console.error(error);
      }
    });
  });
});