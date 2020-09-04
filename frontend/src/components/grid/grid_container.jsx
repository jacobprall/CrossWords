import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GridItem } from './grid_item';
import { useStateValue } from '../state/state';
import { useSelector, useDispatch } from 'react-redux'; 
import { updateGameDetails } from '../../actions/game_actions';

export const HEIGHT = 20;
export const WIDTH = 20;

const Grid = styled.div`
  box-sizing: border-box; 
  display: grid;
  grid: repeat(${props => props.height}, 2.5rem) / repeat(${props => props.width}, 2.5rem);
  place-items: center center;
  align-content: center center;
  height: 50.4rem;
  width: 50.4rem;
`;

// grid[row][col]
// {
//     grid : {
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//     }, 
//     seconds: 54
// }
// const currentWordData = useSelector(state => state.game.nextClue); 

// overlap: state.game.nextClue.overla);
// const [row, setRow] = useState(null);
// const [col, setCol] = useState(null);

// newWordLength; 
// newWordOverlap;
// prevEnd; 
// prevStart 
// newEnd
// newStart
export const GridContainer = ({ overlap, game, seconds, secondsElapsed}) => {
    const [gridItems, setGridItems] = useState([]);
    const [state, dispatch] = useStateValue();
    const dispatchRedux = useDispatch()
    // const [prevStart, setPrevStart] = useState(0);
    // const [prevEnd, setPrevEnd] = useState();
    const [newLength, setNewLength] = useState(null);
    const [lastStartCol, setLastStartCol] = useState(null);
    const [lastEndCol, setLastEndCol] = useState(null);
    const [enter, setEnter] = useState(false); 
    const grid = state["grid"];
    let inputs = []; 
    let wordArray = []; 
    
    useEffect(() => {
        if (game) console.log("the game length: ", game.nextClue["length"]); 
        if (game) setNewLength(game.nextClue["length"])
    }, [game])
    
    
    useEffect(() => {
        let g = game;
        let w = wordArray.join(""); 
        let isSubscribed = true; 
        const updateGame = async (g, w) => (
            await dispatchRedux(updateGameDetails({
                gameId: g.gameId,
                guess: w,
                timeRemaining: seconds,
                timeElapsed: secondsElapsed})
            )
        )
        
        
        // if (enter && w.length && isSubscribed) {    
        //     let positions = updateGame(g, w.toUpperCase()).then((game) => {
        //         console.log("newly received game details: ", game.gameDetails)
        //         if (game.overlap) {
        //             // if (!game.nextDir) {
        //                 return ( [lastEndCol + game.overlap,
        //                     lastEndCol + game.overlap + game.nextWord.length] )
        //             // } else {
        //                 // return lastStartCol + game.overlap - game.nextWord.length;
        //             // }
        //         }
        // //     });
        //     // set globals here with positions as local?
        //     setEnter(false);
        // }

        // startPos;
        

        // $set {lastEndCol, lastStartCol = endPos, startPos};
 
        // setLastEndCol(endPos)
        return () => isSubscribed = false; 
    }, [enter]); 



    const addGridItem = (gridItem) => {
        setGridItems(
            gridItems.concat(gridItem)
        );
    }

    useEffect(() => {
        let isSubscribed = true;
        const updateState = async () => {
            await dispatch(
                {
                    type: 'addGridItems',
                    gridItems: gridItems
                }
            )
        }

        if (isSubscribed) updateState();
        return () => isSubscribed = false;
    }, [gridItems]); 


    for (let i = 0; i < WIDTH; i++) {
        let filledWord = true;

        for (let j = 0; j < HEIGHT; j++) {
            let possibleVal = grid[i + 1][j + 1];
            let val = possibleVal ? possibleVal : "";
            let highlight = false; 

            if (!lastStartCol) {
                if (i === 0 && j < newLength) {
                    highlight = true;  
                    if (!val) filledWord = false; 
                    if (val) wordArray.push(val);
                }
            } else {

            }
                
            inputs.push(
                <GridItem key={`${i} ${j}`}
                    rowStart={i + 1}
                    colStart={j + 1}
                    value={val}
                    addGridItem={addGridItem}
                    highlight={highlight}
                    setEnter={setEnter}
                />
                )
            }
            
        }
        
        return (
            <Grid height={HEIGHT} width={WIDTH}>
            {inputs}
        </Grid>
    )
}



// let prevVal;
// if (j + 1 === 1) {
//     if (grid[i]) prevVal = grid[i][WIDTH];
// } else {
//     prevVal = grid[i + 1][j];
// }

// let foc = false;

// if (!focus) {
//     if (j + 1 === 1 && i > 1) {
//         foc = !possibleVal && grid[i][WIDTH] ? true : false;
//     } else {
//         foc = !possibleVal && grid[i + 1][j] ? true : false;
//     }
// } else if (focus && prevVal && row === i + 1 && col === j + 1) {
//     foc = true;
// }














// import React, { useState, useEffect } from 'react'; 
// import styled from 'styled-components'; 
// import { GridItem } from './grid_item'; 
// import { useStateValue } from '../state/state'; 
// import { useSelector } from 'react-redux'; 
// import { GridRow } from './grid_row';

// export const HEIGHT = 20; 
// export const WIDTH = 20; 

// const Grid = styled.div`
//   box-sizing: border-box; 
//   display: grid;
//   grid: repeat(${props => props.height}, 2.5rem) / repeat(${props => props.width}, 2.5rem);
//   place-items: center center;
//   align-content: center center;
//   height: 50.4rem;
//   width: 50.4rem;
// `;

// // grid[row][col]
// // {
// //     grid : {
// //         row : { col: val }
// //         row : { col: val }
// //         row : { col: val }
// //         row : { col: val }
// //         row : { col: val }
// //         row : { col: val }
// //     }, 
// //     seconds: 54
// // }

// // game:
// // active:
// // 5f517aad8eee17715efcb631:
// // gameId: "5f517aad8eee17715efcb631"
// // nextClue: { _id: "5f50123beb4075ef9cf9bc19", clue: ""Elephant Boy" boy", length: 4 }
// // score: 0
// // wordsGuessed: []
// // wordsSent: ["5f50123beb4075ef9cf9bc19"]
// // __proto__: Object
// // __proto__: Object
// // answerHistory: []
// // saved: { }
// // __proto__: Object
// // session: { isAuthenticated: true, user: { … }, activeGame: "5f517aad8eee17715efcb631" }
// // __proto__: Object

// export const GridContainer = ({ game }) => {
//     // const [gridItems, setGridItems] = useState([]);
//     const [state, dispatch] = useStateValue(); 
//     const [focus, setFocus] = useState(false); 
//     const [row, setRow] = useState(null); 
//     const [col, setCol] = useState(null); 
//     // const [lastChar, setLastChar] =  useState(null); 
//      const currentWordData = useSelector(state => ({
//         "len": state.game.nextClue.length,
//         // overlap: state.game.nextClue.overlap
//     }))

//     const { len, overlap } = currentWordData;

//     const history = useSelector(state => state.game.answerHistory);
//     const grid = state["grid"];
//     const [startPos, setStartPos] = useState(7);
//     const [endPos, setEndPos] = useState(len);
//     const [nextStartPos, setNextStartPos] = useState(0)

   

//     if (overlap < 0) {
//         setNextStartPos(endPos + overlap)
//     } else if (overlap === 0) {
//         setNextStartPos(7)
//     } else {
//         setNextStartPos(startPos + overlap - len)
//     }

//     let gridRows = gridRows || [];

    
//     // const addGridItem = (gridItem) => {
//     //     setGridItems(
//     //         gridItems.concat(gridItem)
//     //         );
//     //         // setFocus(false); 
//     //     }
    
    

//     // if (!history.length) {
//     //     gridRows.push(<GridRow />);
//     // } else {

//     // }
        
//     useEffect(() => {
//         let startPos = 0;
//         if (game.overlap) {
//             if (!game.nextDir) {
//                 startPos = lastRowEnd = endPos + game.overlap;
//             } else {
//                 startPos = lastRowStart + game.overlap - game.nextWord.length;
//             }
//         }
//         let endPos = startPos + game.nextWord.length;
//         // let gridRowElements = Array.from(document.getElementsByClassName('grid-row'));
//         // gridRowElements.forEach(ele => ele.classList.remove('focus'));
//         gridRows.push(<GridRow game={game} focus={true} startPos={nextStartPos} endPos={endPos} />);
//         startPos = nextStartPos
//     }, [game.nextWord.clue]);

//     // let lastRowStart = startPos;
//     // let lastRowEnd = endPos;
            
//     useEffect(() => {
//         let isSubscribed = true; 
//         const updateState = async () => {
//             await dispatch(
//                 {
//                     type: 'addGridItems', 
//                     gridItems: gridItems
//                 }
//                 )
//             }
//         if (isSubscribed) updateState();  
//         return () => isSubscribed = false;
//     }, [gridItems])
        
//         // let gridRows = [<GridRow length={length} overlap={overlap || 0} word row />]
//         // however many gridItems necessary based on word length + overlap
//         // calling updateGameDetails pushes row onto gridRows
        
//         // let inputs = []; 
        
//     // for(let i = 0; i < WIDTH; i++) {
//     //     for(let j = 0; j < HEIGHT; j++) {
//     //         let possibleVal = grid[i + 1][j + 1]; 
//     //         let val = possibleVal ? possibleVal : ""; 
//     //         let prevVal; 
//     //         if (j + 1 === 1) { 
//     //             if (grid[i]) prevVal = grid[i][WIDTH];
//     //         } else {
//     //             prevVal = grid[i + 1][j]; 
//     //         }
            
//     //         let foc = false;  
            
//     //         if (!focus) {
//     //             if (j + 1 === 1 && i > 1) {
//     //                 foc = !possibleVal && grid[i][WIDTH] ? true : false;
//     //             } else {
//     //                 foc = !possibleVal && grid[i + 1][j] ? true : false;
//     //             }
//     //         } else if (focus && prevVal && row === i + 1 && col === j + 1)  {
//     //             foc = true; 
//     //         }
            
//     //         inputs.push(
//     //             <GridItem key={`${i} ${j}`} 
//     //             rowStart={i + 1} 
//     //             colStart={j + 1} 
//     //             value={val}
//     //             addGridItem={addGridItem}
//     //             focus={foc}
//     //             setFocus={setFocus}
//     //             setRow={setRow}
//     //             setCol={setCol}
//     //             width={WIDTH}
//     //             />
//     //             )
//     //         }
            
//     //     }
                    
//     if (!game) return null;
//     return (
//         <Grid height={HEIGHT} width={WIDTH}>
//             {rows}
//         </Grid>
//     )
// }

