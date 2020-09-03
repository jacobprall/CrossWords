import React from 'react'; 

export const gridReducer = (state, action) => {
    let nextState = { ...state };

    switch (action.type) {
        case 'addGridItems':
            action.gridItems.forEach(gridItem => {
                let row = Object.keys(gridItem)[0];
                let col = (Object.values(gridItem))[0][0];
                let val = (Object.values(gridItem))[0][1];
                nextState[row][col] = val;
            });
            return nextState;
        case 'addSeconds':

        default:
            return state;
    }
}