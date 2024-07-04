import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import supabase from '../../Client';


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Error signing up:', error);
            return;
        }

        console.log('User Logged In Successfully; User Data:', data.user);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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