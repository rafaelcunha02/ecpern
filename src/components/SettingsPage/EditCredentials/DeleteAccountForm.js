import React, { useState } from 'react';
import supabase from '../../../Client';

const DeleteAccountForm = ({ user,  }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [confirm, setConfirm] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!confirm) {
    let button = document.getElementById('delete');
    button.innerHTML = 'CONFIRM DELETE';
    setConfirm(true);
    return;
  } else {
    if (password !== repeatPassword) {
      setErrors(['Passwords do not match']);
      window.location.reload();
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      });

      if (signInError) {
        setErrors(['Incorrect password']);
        return;
      }

      // Delete user's account in Supabase Auth
      const { error: deleteError } = await supabase.auth.api.deleteUser(user.access_token);

      if (deleteError) {
        console.error('Supabase auth delete error:', deleteError.message);
        setErrors([deleteError.message]);
        return;
      }

      alert('Account deleted successfully');
    } catch (error) {
      console.error('Error:', error.message);
      setErrors([error.message]);
    }
  }
  setConfirm(false);
};

  return (
    <div id="EditProfileContainer">
      <div className="profile-section">
        <div className="profile-info">
          <h1>Delete Account</h1>

          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}><em>{error}</em></p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="info-items">
              <label htmlFor="password">Password</label>
              <input type="password"
                id="password" name="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password"
                id="repeatPassword" name="repeatPassword" onChange={e => setRepeatPassword(e.target.value)} />
            </div>
            <button id="delete" type="submit">DELETE ACCOUNT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountForm;