import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission. For example, you could send a request to your server.
    // If the login is unsuccessful, you can set isValid to false to show an error message.
  };

  return (
    <div className="containerLogin">
      <div>
        <form style={{marginTop:"10em"}} onSubmit={handleSubmit}>
          <h1 id="login">Login</h1>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="login" type="submit">Login</button>
        </form>
        <div className="register">
          <p>Don't have an account? <a href="/signup" id="register">Sign Up</a></p>
        </div>
        {!isValid && <em>Invalid username/email or password</em>}
      </div>
    </div>
  );
};

export default Login;