import React, { useState } from 'react';

const EditEmailForm = ({ user, onSubmit }) => {
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ newEmail, repeatEmail, password });
  };

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
            <div className="info-item">
              <label htmlFor="newEmail">New E-mail</label>
              <input type="email"
                id="newEmail" name="newEmail" onChange={e => setNewEmail(e.target.value)} />
            </div>
            <div className="info-item">
              <label htmlFor="repeatEmail">Confirm new E-mail</label>
              <input type="email"
                id="repeatEmail" name="repeatEmail" onChange={e => setRepeatEmail(e.target.value)} />
            </div>
            <div className="info-item">
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