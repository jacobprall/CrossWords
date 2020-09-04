// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useRef } from 'react';
// // import { use } from 'passport';
//I commented this out real quick, there was syntax bug
// const Input = styled.input`
//   width: 2.3rem; 
//   height: 2.3rem; 
//   border-radius: 0 0 0 0;
//   caret-color: transparent;
//   text-align: center;
//   font-size: 2.2rem;
//   font-weight: 500;
//   padding-bottom: 0rem;
//   &:focus {
//     outline-style: none;
//     background-color: #c8c8c8;
//   }
//   &:hover {
//     cursor: pointer;
//     background-color: #c8c8c8;
//   }
// `;
// 
// 
// const GridInput = styled(Input)(({colPos, rowPos}) => ({
//     gridColumn: `${colPos} / span 1`,
//     gridRow: `${rowPos} / span 1`
// }));
// 
// export const GridItem = ({ selected, id, rowPos, colPos, focus }) => {
//   const [char, setChar] = useState("");
// 
//   // const inputFocus = useRef(focus);
// 
//   // useEffect(() => {
//   //   inputFocus.current.focus();
//   // }, []);
// 
//   const update = () => {
//     return e => {
//       let input = e.target.value;
//       let lastChar = input[input.length - 1];
//       let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 
// 
//   const handleChange = (e) => {
//     let input = e.target.value;
//     let lastChar = input[input.length - 1];
//     let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 
// 
//  
//     setChar(lastChar);

//       setChar(lastChar);
//       let nextInput = e.currentTarget.nextSibling;
//       if (nextInput) nextInput.focus();
//     }
//   }

//   const clickHandler = () => {
//     return e => {
//       e.currentTarget.value = '';
//       e.currentTarget.focus();
//     }
//   }

//   const handleKeyDown = () => {
//     return e => {
//       if (e && e.key === 'Backspace') {
//         let prevInput = e.currentTarget.previousSibling;
//         if (prevInput) {
//           prevInput.focus();
//           setChar('');
//         }
//       }
//     }

//   }
  

//   return (
//     <GridInput 
//       type="text"
//       className={`grid-item${selected ? ' selected-row' : ''}`}
//       value={char.toUpperCase()}
//       onChange={handleChange}
//       colPos={colPos}
//       rowPos={rowPos}
//       autoFocus={focus}
//       onKeyDown={handleKeyDown()}
//       onClick={clickHandler()}
//       id={id}
//       disabled={!selected}

//     />
//   )
// }