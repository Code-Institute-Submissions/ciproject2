/* global $ */



$(document).ready(function () {
    $( "#a" ).mousedown(function() {
      $('#a').css('backgroundColor', 'red');
    });
    $( "#b" ).mousedown(function() {
      $('#b').css('backgroundColor', 'blue');
    });
    $( "#c" ).mousedown(function() {
      $('#c').css('backgroundColor', 'orange');
    });
    $( "#d" ).mousedown(function() {
      $('#d').css('backgroundColor', 'lightgreen');
    });
      $('.game-div').mouseup(function (){
        $(this).css('backgroundColor', 'white');
    });



});
