import React, { useState } from 'react';

const DeleteAccountForm = ({ user, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ password, repeatPassword });
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
            <div className="info-item">
              <label htmlFor="password">Password</label>
              <input type="password"
                id="password" name="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="info-item">
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