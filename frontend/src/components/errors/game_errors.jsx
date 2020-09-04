import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'; 

const mapStateToProps = ({ errors: { game } }) => ({
  errors: game,
});

const Errors = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  list-style: none;
  width: 100%;
  height: 36px;
  padding-left: 10%;
`;

const SingleError = style.li`
  color: red;
  line-height: 36px;
`;

const GameErrors = ({ errors }) => (
  errors.length ? (
  <Errors className="game-errors">
    {errors.map((error, idx) => <SingleError key={`game-error-${idx}`} className="game-error">{error}</SingleError>)}
  </Errors>
  ) : null
);



export default connect(mapStateToProps, null)(GameErrors);