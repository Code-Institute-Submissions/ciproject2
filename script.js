/* global $ */

var playingDemo = false;
var currentRound = 5 ;
var currentSequence = [ 1, 2, 3 ] ;


// storing setInterval() in here will allow us to stop it.
var interval ;

var sounds = {
    a: new Audio('sounds/a.mp3'),
    b: new Audio('sounds/b.mp3'),
    c: new Audio('sounds/c.mp3'),
    d: new Audio('sounds/d.mp3')
}
var transformTable = {
    1: 'a', 2: 'b', 3: 'c', 4: 'd' 
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


    playNextRound(currentRound);
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function playNextRound(currentRound) {
    playingDemo = true ;
    var i = 0 ;
    
    for (i=0; i < currentRound; i++) {
        currentSequence.push(getRandomInt(1, 4));
        console.log(i);
    }
    console.log(currentSequence);
    console.log(currentSequence[0])
    

    var iteration = 0 ;
    console.log(iteration + 'yes');
    interval = setInterval( function () {
        if (iteration == currentSequence.length) {
            clearInterval(interval);
        }
        console.log('iteration: '+ iteration);
        var sound = transformTable[currentSequence[iteration]];
        sounds[sound].play();
        iteration++;
    }, 1000)

    // put a script here that will play a sequence and set playingDemo = true, once it's finished
}