import React, { useState } from 'react';
import supabase from '../../../Client';
import bcrypt from 'bcryptjs';


const EditEmailForm = ({ user }) => {
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = [];
  
    if (newEmail !== repeatEmail) {
      errors.push('Emails do not match');
    }
    if (!newEmail) {
      errors.push('Email cannot be empty');
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      errors.push('Invalid email address');
    }
    if (!password) {
      errors.push('Password cannot be empty');
    }
    if (password === newEmail) {
      errors.push('Password cannot be the same as the email');
    }
  
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
  
    if (typeof password !== 'string') {
      console.log("password: ", password);
      throw new Error('Invalid password data');
    }
  
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }
  
      if (!user.email || typeof user.email !== 'string') {
        throw new Error('Invalid or missing email');
      }
  
      console.log('Current user data:', user);
  
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      });
  
      if (signInError) {
        throw new Error('Incorrect password');
      }
  
      // Update user's email in Supabase Auth
      const { data, error: supabaseError } = await supabase.auth.updateUser({ email: newEmail });
  
      if (supabaseError) {
        console.error('Supabase auth update error:', supabaseError.message);
        throw new Error(supabaseError.message);
      }
  
      console.log('Supabase auth update response:', data);
  
      // Fetch the user data again to confirm the update
      const { data: updatedUser, error: fetchError } = await supabase.auth.getUser();
      if (fetchError) {
        throw new Error('Error fetching updated user data');
      }
  
      console.log('Updated user data:', updatedUser);
  
      // Update user's email in the custom Users table
      const formInfo = {
        email: newEmail,
        id: user.id
      }
  
      const res = await fetch(`http://localhost:4005/api/users/change-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInfo)
      });
  
      if (!res.ok) {
        const error = await res.json();
        console.error('Custom table update error:', error.message);
        throw new Error(error.message);
      }
  
      console.log('Custom table update response:', await res.json());
  
      alert('Email changed successfully');
    } catch (error) {
      console.error('Error:', error.message);
      setErrors([error.message]);
    }
  };
  
  
  
  

  console.log(user);
  return (
    <div id="EditProfileContainer">
      <div className="profile-section">
        <div className="profile-info">
          <h1>Change Email</h1>

          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}><em>{error}</em></p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="info-items">
              <label htmlFor="newEmail">New E-mail</label>
              <input type="email"
                id="newEmail" name="newEmail" onChange={e => setNewEmail(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="repeatEmail">Confirm new E-mail</label>
              <input type="email"
                id="repeatEmail" name="repeatEmail" onChange={e => setRepeatEmail(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="Password">Password</label>
              <input type="password"
                id="Password" name="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Apply Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmailForm;