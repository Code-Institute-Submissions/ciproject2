/* global $ */

var playingDemo = true;
var currentRound = 1 ;
var currentSequence = [ ] ;
var playerClick = 0;
var timeout ;
// storing setInterval() in here will allow us to stop it.
var interval ;

var sounds = {
    a: new Audio('sounds/a.mp3'),
    b: new Audio('sounds/b.mp3'),
    c: new Audio('sounds/c.mp3'),
    d: new Audio('sounds/d.mp3')
}
var failSound = new Audio('sounds/combobreaker.mp3');
var activeSound ;
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
    // $('.game-div').mouseup(function (){
    //     $(this).css('backgroundColor', 'white');
    // });
    
    $('.game-div').click(function (){
        // clicks will do nothing if the script is currently playing the sequence
        if (playingDemo === false) {
            // , or a previous sound is being played
            if (typeof(activeSound) !== 'undefined' && activeSound.ended !== true) {
                return false;
            }
        
            var id = $(this).attr('id') ;
            activeSound = sounds[id] ;
            activeSound.onended = function() {
                //
                $('.game-div').css('backgroundColor', 'white');
            }
            activeSound.play();
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
                timeout = setTimeout(function() {
                    playNextRound(currentRound, true);
                }, 3000);
                playerClick = 0 ;
            }
        }   
    });

    

});
function debugg(text) {
    $('#debugdiv').append('<br/>' + text) ;
    var div = $('#debugdiv')
    div.scrollTop(div.prop("scrollHeight"));
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetGame() {
    $("#start").prop("disabled",false);
    debugg("Resetting all variables...")
    currentRound = 1 ;
    playerClick = 0 ;
    currentSequence = [];
    clearInterval(interval);
    clearTimeout(timeout);
    
}

function playNextRound(currentRound, repeat = false, fromHtml = false) {
    
    if (fromHtml === true) {
        // disable the button
        $("#start").prop("disabled",true);
    }
    $('#status').text('Round: '+currentRound);
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

        // we need to light up a div as well
        var divId = transformTable[currentSequence[iteration]];
        $('#' + divId).css('backgroundColor', $('#' + divId).css("border-left-color"));
        // ...and make it hollow again
        setTimeout(function() {
            $('#' + divId).css('backgroundColor', 'white');
        }, 500);
        iteration++;
    }, 1000)


    
}