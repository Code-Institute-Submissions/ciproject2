## [Github Pages](https://taigatenori.github.io/ciproject2/)

# Simon game

A simple memory game where player is challenged with remembering a sequence of sounds
 
## UX
 
This website is for anyone who likes to exercise their memory, as well as people looking for a quick dopamine rush.

# User stories
- As an avid gamer, I want to play to my heart's content. This game offers me infinite amounts of fun and virtually unlimited progress.
- As a user, I may not like how the sound sequence has developed, that's why there's a reset button to start over.

## Features

- Plays a sequence of sounds, expecting the user to repeat them in exact same order
- Adds another note after the user has successfuly completed the previous sequence
- Repeats the sequence on failure
- Gives the user ability to reset the game and start over with one sound
- Features dynamic round counter
- Upon setting debugMode = true, an additional <div> is being shown that contains the correct sequence (aka cheat mode) and other debug info

### Future Features

- Make a switch button, that allows the user to enter different game mode, where the sequence for each round is randomly generated, instead of adding onto the existing sequence.


## Technologies Used

- [JQuery](https://jquery.com)

## Testing

1. Clicking circles
    1. Start the game
    2. Advance a round or two
    3. Try to repeat the sequence very fast
    4. Clicks will not register if the sound from the previous click is playing - haven't been able to find a good workaround other than trimming all sounds to 0.4s. It is not game-breaking though.

2. Resetting the game works as expected, with round being properly reset and new sound sequence being generated

3. Clicking the circle out of the sequence properly causes the fail sound to play and repeats the sequence after a short delay

4. The game was tested on my mobile phone - Nokia 8.1 and has all features of dekstop version, additionaly looks good.

5. Hitting 'reset' button before the new sequence starts playing (during a short delay between rounds) results in the game not being reset, but start button becoming enabled
    - I am clearing both interval and timeout when the user hits 'reset' button,
      possible workaround would be disabling the 'reset' button whenever an interval or timeout is set, and enabling it when the timed function finishes

## Deployment

Deployed version is the development version - uses 'master' branch from GitHub.

I've started this project using Cloud9, then linked it to a repository on GitHub. From there project settings had an option to host my master branch on GitHub Pages


## Credits
- Nishant Kumar (valuable feedback)


### Media
- Sounds were obtained from another open-source Simon game and shortened

### Acknowledgements

- I received inspiration for this project from CodeInstitute's project outline