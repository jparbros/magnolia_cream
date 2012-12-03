// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery.min
//= require jquery_ujs
//= require jquery/jquery-ui-1.8.17.custom.min
//= require bootstrap.min
//= require jquery.lazyload.min

$(function(){
  $("img.lazy").show().lazyload();
});