import React, { useState } from 'react';
import './SignUp.css';
import '../../common.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission. For example, you could send a request to your server.
  };

  return (
    <div className="containerLogin">
      <div style={{ marginTop: '4em' }}>
        <form onSubmit={handleSubmit}>
          <h1 id="register">Sign Up</h1>
          <div>
            <input
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              minLength="3"
              maxLength="20"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="E-mail"
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              minLength="2"
              maxLength="20"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Last Name"
              type="text"
              id="lastName"
              minLength="2"
              maxLength="20"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button id="signup" type="submit">Sign up</button>
        </form>
        <div className="register">
          <p>Already have an Account? <a href="/login" id="register">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;