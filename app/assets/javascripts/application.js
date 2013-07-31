// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery.min
//= require jquery_ujs
//= require jquery/jquery-ui-1.8.17.custom.min
//= require bootstrap.min
//= require jquery.lazyload.min
//= require jquery.placeholder.min

$(function(){
  $("img.lazy").show().lazyload();
  
  $('.show-new-user-form').click(function() {
    $('#new_user_session').hide(1000);
    $('#new_user').show(1000);
  })
  
  $('.show-new-user-session-form').click(function() {
    $('#new_user').hide(1000);
    $('#new_user_session').show(1000);
  });
  
  $('#save-names').click(function(event) {
    event.preventDefault();
    $('#modal-name form').submit();
  })
});

