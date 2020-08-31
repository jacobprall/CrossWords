import React, { useState } from 'react';

export default function Session({ props }) {
  const { formType, errors, processForm, processDemoForm } = props;

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
    processForm(currentUser);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const demoUser = {
      email: 'demo@email.com',
      password: 'password',
    };
    processDemoForm(demoUser);
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
          <label>
            {' '}
            Username:
            <input type="text" value={username} onChange={update('username')} />
          </label>
        </>
      );
    }
  };

  // const renderErrors = () => {
  //   return (
  //     <ul className="session-errors">
  //       {errors.map((error, i) => (
  //         <li className="session-error" key={`error-${i}`}>
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  const renderInputs = () => {
    return (
      <div>
        <label>
          Email:
          <input type="text" value={email} onChange={update('email')} />
        </label>

        {renderUsername()}

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={update('password')}
          />
        </label>
      </div>
    );
  };

  const formHeader = () => {
    if (formType === '/login') {
      return <div>Welcome Back!</div>;
    } else {
      return <div>Welcome!</div>;
    }
  };

  const renderForm = () => {
    return (
      <div>
        {formHeader()}
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <button>Submit</button>
          <button onClick={handleDemoSubmit}>Sign in as Demo User</button>
        </form>
        {/* {renderErrors()} */}
      </div>
    );
  };

  return <div>{renderForm()}</div>;
}
