import { gridReducer } from './grid_reducer';
import { secondReducer } from './second_reducer';

const grid = {};
const seconds = {};
for (let i = 0; i < 20; i++) grid[i + 1] = {};
export const initialState = { grid, seconds };

export const mainReducer = ({ grid, seconds }, action) => ({
    grid: gridReducer(grid, action),
    seconds: secondReducer(seconds, action)
});