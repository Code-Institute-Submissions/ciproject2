/* global $ */

var playingDemo = true;
var currentRound = 1 ;
var currentSequence = [ ] ;
var playerClick = 0;

// storing setInterval() in here will allow us to stop it.
var interval ;

var sounds = {
    a: new Audio('sounds/a.mp3'),
    b: new Audio('sounds/b.mp3'),
    c: new Audio('sounds/c.mp3'),
    d: new Audio('sounds/d.mp3')
}
var failSound = new Audio('sounds/combobreaker.mp3');

var transformTable = {
    1: 'a', 2: 'b', 3: 'c', 4: 'd' 
}
var oTable = {
    a: 1, b: 2, c: 3, d: 4
}
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
    $('.game-div').click(function (){
        // clicks will do nothing if the script is currently playing the sequence
        if (playingDemo === false) {

        
            var id = $(this).attr('id') ;
            sounds[id].play();
            if (currentSequence[playerClick] == oTable[id]) {
                
                debugg('good! ' + playerClick);
                if (playerClick == currentSequence.length - 1) {
                    // go to the next round
                    debugg("Success! Next round...")
                    currentRound++ ;
                    playNextRound(currentRound, false);
                    
                }
                else {
                    playerClick++;
                }
            }
            else {
                // wrong sequence, reset 
                debugg("Wrong. Playing it again...")
                failSound.play() ;
                playingDemo = true;
                setTimeout(function() {
                    playNextRound(currentRound, true);
                }, 3000);
                playerClick = 0 ;
            }
        }   
    });

    

});
function debugg(text) {
    $('#debugdiv').append('<br/>' + text) ;
    var h = $('#debugdiv').height();
    $('#debugdiv').scrollTop(h);
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function playNextRound(currentRound, repeat = false) {
    playerClick = 0 ;
    playingDemo = true ;
    var i = 0 ;
    
    if (repeat === false) {
        currentSequence.push(getRandomInt(1, 4));
    } 


    debugg("Current sequence: " + currentSequence);


    var iteration = 0 ;

    interval = setInterval( function () {
        if (iteration == currentSequence.length-1) {
            clearInterval(interval);
            // the sound sequence is over
            playingDemo = false;
            // now set the 'listener' for user clicks
        }

        var sound = transformTable[currentSequence[iteration]];
        sounds[sound].play();
        // set bg color of other divs to white
         $('.game-div').css('backgroundColor', 'white');
        // we need to light up a div as well
        var divId = transformTable[currentSequence[iteration]];
        $('#' + divId).css('backgroundColor', $('#' + divId).css("border-left-color"));
        iteration++;
    }, 1000)

    
}