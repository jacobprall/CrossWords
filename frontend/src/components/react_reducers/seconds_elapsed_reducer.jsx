import React from 'react';

export const secondsElapsedReducer = (state, action) => {
    switch (action.type) {
        case 'addSecondsElapsed':
            return action.secondsElapsed;
        default:
            return state;
    }
}

