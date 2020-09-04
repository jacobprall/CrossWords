import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'; 

const mapStateToProps = ({ errors: { game } }) => ({
  errors: game,
});

const Errors = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  list-style: none;
  width: 90rem;
  height: 18px;
  padding-left: 0px;
  margin-left: 6%;
  margin-top: 1%;
`;

const SingleError = styled.li`
  color: red;
  line-height: 18px;
`;

const GameErrors = ({ errors }) => (
  errors.length ? (
  <Errors className="game-errors">
    {errors.map((error, idx) => <SingleError key={`game-error-${idx}`} className="game-error">{error}</SingleError>)}
  </Errors>
  ) : null
);



export default connect(mapStateToProps, null)(GameErrors);