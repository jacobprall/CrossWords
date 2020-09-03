import React from 'react'; 

export const secondReducer = (state, action) => {
    switch (action.type) {
        case 'addSeconds':
            return action.seconds;
        default:
            return state;
    }
}