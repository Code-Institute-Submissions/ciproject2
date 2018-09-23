/* global $ */

var playingDemo = false;
var currentRound = 0 ;

var sounds = {
    a: new Audio('sounds/a.mp3'),
    b: new Audio('sounds/b.mp3'),
    c: new Audio('sounds/c.mp3'),
    d: new Audio('sounds/d.mp3')
}

$(document).ready(function () {
    
    // clicks will do nothing if the script is currently playing the sequence
    if (playingDemo) {
        return;
    }
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
    $('.game-div').click(function (){
        var id = $(this).attr('id') ;
        sounds[id].play();
    });


});

function playNextRound(currentRound) {
    playingDemo = true ;
    // put a script here that will play a sequence and set playingDemo = true, once it's finished
}