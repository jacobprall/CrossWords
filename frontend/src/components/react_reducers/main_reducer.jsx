import { gridReducer } from './grid_reducer';
import { secondReducer } from './second_reducer';
import { guessReducer, revealedReducer } from './guess_reducer';
import { secondsElapsedReducer } from './seconds_elapsed_reducer';

const grid = {};
const seconds = {};
const secondsElapsed = {};
const guess = '';
const revealed = '';
for (let i = 0; i < 20; i++) grid[i + 1] = {};
export const initialState = { grid, seconds, secondsElapsed, guess, revealed };

export const mainReducer = ({ grid, seconds, secondsElapsed, guess, revealed }, action) => ({
    grid: gridReducer(grid, action),
    seconds: secondReducer(seconds, action),
    guess: guessReducer(guess, action),
    revealed: revealedReducer(revealed, action),
    secondsElapsed: secondsElapsedReducer(secondsElapsed, action),
});