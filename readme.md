# AcrossWords

AcrossWords is a variation on the classic Cross Words. Players are provided with a clue and a limited amount of time to fill out as many words as they can.

## Some Key Features

- BCRYPT and JWT aided user authentication
- Almost 16,000 words and clues
- Database is queried in real time after every answer
- The next word is always generated such that it overlaps with the previous word
- Player's score and time remaining adjust dynamically depending on the correctness of their answers
- Utilizes function components as well as React Hooks

## MongoDB Database

On our MongoDB database, we store game data (clues given and guesses made) and a users collection for authentication, but the main feature is the collection of almost 16,000 words and clues drawn from New York Times crossword puzzles.

### Seeding clues

We created a parsing script to pull clues from the `.puz` format, then a seeding script to drop into our database.

### Indexing

Our variation of a crossword puzzle gives users a few "free" letters at either the beginning or end of a word. Naively, to search the database for clues that match either the first X letters or the last X letters (without other matching criteria) would result in a time complexity of O(n), which would be detrimental to the playing experience. The solution would be to add indexes and let MongoDB's query engine do the work for us. Normally, indexing several fields of a database would be ill-advised, since the index may need to be rotated/rebuilt when adding/updating records. However, since this collection was static, extra indexes only improve our performance at the expense of more time upfront to build them out.

We decided to add a couple fields to each document in the database (`prefixes` & `suffixes`) which were calculated in the seed script and include a list of substrings from the front and end of the clue's answer, respectively. Indexing on each, as well as `length` and `difficulty`, allow us to get O(log n) performance when fetching a selection of possible new clues. We then apply a little randomness to ensure that each game is unique.

## Gameplay

### Grid

The length of the correct answer is given to the player by a series of blank `input` tags. No matter what answer is given, the following word will line up to either the front or end of the previous word guessed. To improve the dynamism of gameplay, we used a CSS grid to align the words in columns and rows. The starting column is calculated on the back end based on the previous answer, and is sent with the response, and then lined up on the board. CSS Grid proved easy to use and allowed things to flow well.

### Score, Timer, and Clue

<!-- if you want to add a gif, use the format below -->
<!-- ![name_of_gif](source of gif) -->
<!-- I added an images folder, add the gifs there. -->
<!-- example: -->
<!-- ![user_asset_details](app/assets/images/user_asset_details.png) -->

### Technologies

- MongoDB
- Express.js
- React.js, Redux.js, React & React-Redux Hooks
- NodeJS
- Styled Components
- Passport and JWT
