/* global $ */


var debugMode = false;

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
};
var failSound = new Audio('sounds/combobreaker.mp3');
var activeSound ;
var transformTable = { 1: 'a', 2: 'b', 3: 'c', 4: 'd' } ;
var oTable = { a: 1, b: 2, c: 3, d: 4 } ;



$(document).ready(function () {
    if (debugMode !== true) {
        $('.debug').css('display', 'none');
    }
    $( "#a, #b, #c, #d" ).mousedown(function() {
        if (playingDemo === false) {
            var color = $(this).css("border-left-color");
            $(this).css('backgroundColor', color);
        }
    });

    $('.game-div').mouseup(function (){
         $(this).css('backgroundColor', 'white');
    });
    
    $('.game-div').click(function (){
        // clicks will do nothing if the script is currently playing the sequence
        if (playingDemo === false) {
            // , or a previous sound is being played
            if (typeof(activeSound) !== 'undefined' && activeSound.ended !== true) {
                return false;
            }
            // , or there's pause after a failed attempt
            // TODO
            var id = $(this).attr('id') ;
            activeSound = sounds[id] ;
            activeSound.onended = function() {
                //
                $('.game-div').css('backgroundColor', 'white');
            };
            activeSound.play();
            if (currentSequence[playerClick] == oTable[id]) {
                

                if (playerClick == currentSequence.length - 1) {
                    // go to the next round

                    $('#status').text("Good! Next round...");
                    effectComplete();
                    currentRound++ ;
                    playingDemo = true;
                    setTimeout(function () {
                        playNextRound(currentRound, false);
                    }, 2000);
                    
                    
                }
                else {
                    // correct, listen for another
                    playerClick++;
                }
            }
            else {
                // wrong sequence, reset 

                $('#status').text("Wrong! Playing it again");
                failSound.play() ;
                playingDemo = true;
                timeout = setTimeout(function() {
                    playNextRound(currentRound, true);
                }, 2000);
                playerClick = 0 ;
            }
        }   
    });

    

});
function debugg(text) {
    if (debugMode === true) {
        var div = $('#debugdiv') ;
        div.append('<br/>' + text) ;
        div.scrollTop(div.prop("scrollHeight"));
    }
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetGame() {
    if (playingDemo === true) {
        return;
    }
    $("#start")
    .prop("disabled",false)
    .css('color', '#14396a');

    $('#status').text("Round: 1");
    currentRound = 1 ;
    playerClick = 0 ;
    currentSequence = [];
    clearInterval(interval);
    clearTimeout(timeout);
    playingDemo = true;
    effectComplete();
    
}
function effectComplete() {

    var i = 0 ;
    var int = setInterval(function() {
        if (i > 5) {
            clearInterval(int);
        }
        $( "#a, #b, #c, #d" ).css('backgroundColor', i % 2 ? '#c4daff' : 'white') ;
        i++;
    }, 100);
}
function playNextRound(currentRound, repeat = false, fromHtml = false) {
    
    if (fromHtml === true) {
        // disable the button
        $("#start").prop("disabled",true);
        $("#start").css('color', '#f2f5f9');

    }
    $('#status').text("Playing the sequence");
    playerClick = 0 ;
    playingDemo = true ;

    
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

            setTimeout(function () {
               $('#status').text("Round: " +currentRound); 
            }, 500);
            
        }

        var sound = transformTable[currentSequence[iteration]]; // sound is also div id
        sounds[sound].play();

        //light up the div
        $('#' + sound).css('backgroundColor', $('#' + sound).css("border-left-color"));
        
        // ...and make it hollow again after a while
        setTimeout(function() {
            $('#' + sound).css('backgroundColor', 'white');
        }, 500);
        
        iteration++;
        
    }, 700);


    
}