import React from 'react';

export const guessReducer = (state, action) => {
    switch (action.type) {
        case 'addGuess':
            return action.guess;
        default:
            return state;
    }
}

export const answerReducer = (state, { type, answer }) => {
  switch(type) {
    case 'addAnswer':
      return answer;
    default:
      return state;
  }
}

