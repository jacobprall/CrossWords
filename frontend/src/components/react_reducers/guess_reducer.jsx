import React from 'react';

export const guessReducer = (state, action) => {
    switch (action.type) {
        case 'addGuess':
            return action.guess;
        default:
            return state;
    }
}

export const revealedReducer = (state, { type, revealed }) => {
  switch(type) {
    case 'addRevealed':
      return revealed;
    default:
      return state;
  }
}

