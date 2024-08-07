import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './SignUp.css';
import '../../common.css';
import supabase from '../../Client';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new user
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Error signing up:', error);
            return;
        }

        console.log('User created successfully. Redirecting to login page...');

        // The user data will be available under `data.user`
        const user = data.user;

        // Add the new user to the "Users" table
        const { data: insertData, error: insertError } = await supabase
            .from('Users')
            .insert([
                { 
                    id: user.id, 
                    username: username, 
                    email: email, 
                    firstName: firstName, 
                    lastName: lastName, 
                    profilePicUrl: null, 
                    rank: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ]);

        if (insertError) {
            console.error('Error inserting new user:', insertError);
            return;
        }

        console.log('User inserted into Users table successfully');

        setTimeout(() => {
            navigate('/login');
        }, 500);
    };


  return (
    <div className="containerLogin">
      <div style={{ marginTop: '4em' }}>
        <form id="signUpForm" onSubmit={handleSubmit}>
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