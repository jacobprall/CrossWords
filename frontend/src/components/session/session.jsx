import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: auto;
  width: 25rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f5f5;
  border: 0.1rem solid #101010;
  border-radius: 0.2rem;
`;
// e8e8e8;
// box-shadow: 0px 0px 1rem #d3d3d3;
const Welcome = styled.h1`
  height: 3rem;
  margin-top: 2rem;
  color: #101010;
  font-weight: 500;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inputs = styled.div`
  height: ${(props) => (props.formType === 'login' ? '4rem;' : '6rem;')}
  display: flex; 
  flex-direction: column;
  justify-content: space-around;  
`;

const LabelText = styled.p`
  margin-right: 0.5rem;
  font-weight: 300;
`;

const Input = styled.input`
  height: 1.2rem;
  outline-color: #696969;
  padding: 0rem 0.3rem 0rem 0.3rem;
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Buttons = styled.div`
  height: 4.7rem;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  right: -0.3rem;
`;

const LoginAndDemo = styled.button`
  background: none;
  color: white;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  width: 7rem;
  font-weight: 350;
  text-align: center;
  background-color: #708090;
  border-radius: 0.2rem;
  &:hover {
    background-color: #36454f;
    transition: 0.3s;
    cursor: pointer;
  }
`;

const Errors = styled.div`
  padding-top: 1rem;
  margin-left: 1rem;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #a73232;
`;

const Error = styled.p``;

export default function Session({ props }) {
  const { formType, errors, handleUser, handleDemoUser } = props;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = {
      email: email,
      username: username,
      password: password,
    };

    handleUser(currentUser);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    const demoUser = {
      email: 'demo@email.com',
      password: 'password',
    };

    handleDemoUser(demoUser);
  };

  const update = (field) => {
    return (e) => {
      switch (field) {
        case 'email':
          setEmail(e.currentTarget.value);
          break;
        case 'username':
          setUsername(e.currentTarget.value);
          break;
        case 'password':
          setPassword(e.currentTarget.value);
          break;
        default:
          return null;
      }
    };
  };

  const renderUsername = () => {
    if (formType === '/signup') {
      return (
        <>
          <Label>
            {' '}
            <LabelText>Username:</LabelText>
            <Input type="text" value={username} onChange={update('username')} />
          </Label>
        </>
      );
    }
  };

  const renderErrors = () => {
    return (
      <Errors>
        {errors.map((error, i) => (
          <Error key={`error-${i}`}>{error}</Error>
        ))}
      </Errors>
    );
  };

  const renderInputs = () => {
    return (
      <Inputs formType={formType.split('/')[1]}>
        <Label>
          <LabelText>Email:</LabelText>
          <Input type="text" value={email} onChange={update('email')} />
        </Label>

        {renderUsername()}

        <Label>
          <LabelText>Password:</LabelText>
          <Input
            type="password"
            value={password}
            onChange={update('password')}
          />
        </Label>
      </Inputs>
    );
  };

  const formHeader = () => {
    if (formType === '/login') {
      return <Welcome>Welcome Back!</Welcome>;
    } else {
      return <Welcome>Welcome!</Welcome>;
    }
  };

  const renderForm = () => {
    return (
      <Container>
        {formHeader()}
        <Form onSubmit={handleSubmit}>
          {renderInputs()}
          <Buttons>
            <LoginAndDemo>
              {formType === '/login' ? 'Log In' : 'Sign Up'}
            </LoginAndDemo>
            <LoginAndDemo onClick={handleDemoSubmit}>Demo</LoginAndDemo>
          </Buttons>
        </Form>
        {renderErrors()}
      </Container>
    );
  };

  return <div>{renderForm()}</div>;
}
