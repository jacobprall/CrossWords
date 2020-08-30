import React, { useState } from 'react'

export default function Session({props}) {
  console.log(props)
  const {formType, errors, isSignedIn, processForm} = props
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    processForm(user)
  }

  const setDemoUser = () => {
    setUser({
      email: "demo@email.com",
      username: "test",
      password: "password",
    });
    return handleSubmit
  };

  const update = (field) => {
    return (e) => setUser({ [field]: e.currentTarget.value });
  };




  const renderUsername = () => {
    if (formType === '/signup') {
      return (
        <label> Username:
          <input type="text" value={user.username} onChange={update('username')}/>
        </label>
      );
    }
  };

  const renderErrors = () => {
    return (
      <ul className="session-errors">
        {errors.map((error, i) => (
          <li className="session-error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  };


  const renderInputs = () => {
    return (
    <div>
      <label>
        Email
        <input type="text" value={user.email} onChange={update("email")} />
      </label>
      <br />
      {renderUsername()}
      <label>
        Password
        <input type="password" value={user.password} onChange={update("password")} />
      </label>
    </div>
    );
  }
  
  const formHeader = () => {
    if (formType === '/login') {
      return (<div>Welcome Back!</div>)
    } else {
      return (<div>Welcome!</div>)
    }
  }

  const renderForm = () => {
    return (
      <div>
        {formHeader()}
        <form>
          {renderInputs()}
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={setDemoUser}>Sign in as Demo User</button>
        </form>
        {renderErrors()}
      </div>
    )
  }
  
  


  
  
  return (
    <div>
      {renderForm()}
    </div>
  );
}
