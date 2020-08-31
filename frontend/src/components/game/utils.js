class Tile {
    constructor(pos, char) {
        this.pos = pos;
        this.char = char;
    }


}

class Word {
    constructor(word, posOpen, dir) {
        this.len = word.len; // can't use .length as it is reserved
        this.answer = word.answer;
        this.guess = "";
        this.clue = word.clue;
        this.difficulty = word.difficulty;
        this.tiles = {} // pos: char
        // this.tiles = [];
        this.posOpen = posOpen;
        this.dir = dir;
        // dir is a [ele, ele] array vector => could even make a diagonal word if we wanted to
    }

    buildTilesVector() {
        let length = this.len;
        let tilePos = this.posOpen.slice();
        for (let i = 0; i < length; i++) {
            tilePos[0] += this.dir[0]; tilePos[1] += this.dir[1];
            if (this.guess[i]) {
                this.tiles[tilePos] = new Tile(tilePos, this.guess[i]);
            } else {
                this.tiles[tilePos] = new Tile(tilePos, "");
            }
            // this.tiles.push(new Tile(tilePos, this.guess));
        }
    }

}

class Crossword {
    constructor() {

        this.words = {} // word.answer: [word, direction]
        // this.words = [];
        this.wordInitKey = "";
        this.currPos = [0, 0];
        this.lengthLimit = 20; // used to check sides of the grid => constant value
        Object.freeze(this.lengthLimit); // is this legal?
        this.spacesRight = this.lengthLimit;
        this.spacesLeft = 0;
    }

    addWord(word, dir) { // add new word into this crossword object
        // const dir = [0, 1];
        // dir[0] = Math.random(); // get random direction => must set restrictions based upon prior word dirs -> [1, 0, -1] are possibilities
        // dir[1] = Math.random(); // get random direction => must set restrictions based upon prior word dirs -> [1, 0, -1] are possibilities
        this.words[word.answer] = [new Word(word, this.currPos, dir), dir];
        this.wordInitKey = word.answer.slice();
    }

    typeAction(char) { // called every time a letter is typed
        this.words[this.wordInitKey][0].guess += char;
        this.words[this.wordInitPos][0].tiles[this.currPos].char = char;
       
        if (this.words[this.wordInitKey[1][1]] === 1) { // go right or left depending on dir of word
            this.currPos[1] -= 1;
            this.spacesRight -= 1;
            this.spacesLeft += 1;
        } else {
            this.currPos[1] += 1;
            this.spacesRight += 1;
            this.spacesLeft -= 1;
        }
    }

    
    checkGuess() {
        // add time if returns true after this is called
        // will return true if guess and answer match, otherwise false

        if (this.words[this.wordInitKey][0].guess === this.words[this.wordInitKey][0].answer) { return true; }
        return false;
    }

    // query database with this.spacesRight and this.spacesLeft
    // if result of first querry is .length === 0, try with other side
    // dir should be [0, +-1] depending on which side the word is happening on
    setNewWord(dir) {
        // adds the next word to the crossword

        this.addWord(word, dir);
    }

}