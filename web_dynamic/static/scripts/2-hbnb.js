$(document).ready(() => {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    console.log(data.status);
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').remove('available');
    }
  });
});
