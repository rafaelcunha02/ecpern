import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import supabase from '../../Client';


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Error signing up:', error);
            setIsValid(false);
            return;
        }
        else{
            navigate('/');
            window.location.reload();
        }
  };

  return (
    <div className="containerLogin">
      <div>
        <form id="signInForm" style={{marginTop:"10em"}} onSubmit={handleSubmit}>
          <h1 id="login">Login</h1>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Email"
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
        
        {!isValid && <em style={{alignSelf:"center"}}>Invalid username/email or password</em>}</div>
      </div>
    </div>
  );
};

export default Login;