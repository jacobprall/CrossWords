# AcrossWords
AcrossWords is a variation on the classic Cross Words game. Players are provided with a clue and a limited amount of time to fill out as many words as they can.

## Some Key Features
* BCRYPT and JWT aided user authentication
* Over 16,000 words and clues
* Database is queried in real time after every answer
* The next word is always generated such that it overlaps with the previous word 
* Player's score and time remaining adjust dynamically depending on the correctness of their answers
* Utilizes function components as well as React Hooks

## MongoDB Database
<!-- use ### for subsections within the MongoDB Databse section -->
<!--  -->
<!-- [Click here for more info](https://github.com/jacobprall/CrossWords/blob/f36ec37313de785ceb7e6a9bc92948aef588bf17/routes/api/route_helpers/game/patch/getNextWord.js#L48) -->
## Gameplay 

### Grid
*Presents one row at a time, aligning it with the previous row depending on the overlap between the new and old word
*Allows players to easily navigate through the input boxes using arrow keys
*Answers are colored in red and green to indicate correctness 

### Score, TimeElapsed, and Clue Components
*All values are fetched and adjusted in real time
*State is mantained using a custom useStateValue hook

<!-- if you want to add a gif, use the format below -->
<!-- ![name_of_gif](source of gif) -->
<!-- I added an images folder, add the gifs there. -->
<!-- example: -->
### Game Play Example: 
![game_play_gif](frontend/images/game_play_gif.gif)

### Technologies 

* MongoDB, Express.js
* React.js, Redux.js, React & React-Redux Hooks 
