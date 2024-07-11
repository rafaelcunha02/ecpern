import React, { useState } from 'react';

const EditPasswordForm = ({ user, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword, repeatPassword });
  };

  return (
    <div id="EditProfileContainer">
      <div className="profile-section">
        <div className="profile-info">
          <h1>Change Password</h1>

          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}><em>{error}</em></p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="info-item">
              <label htmlFor="oldPassword">Current Password</label>
              <input type="password"
                id="oldPassword" name="oldPassword" onChange={e => setOldPassword(e.target.value)} />
            </div>
            <div className="info-item">
              <label htmlFor="newPassword">New Password</label>
              <input type="password"
                id="newPassword" name="newPassword" onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className="info-item">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password"
                id="repeatPassword" name="repeatPassword" onChange={e => setRepeatPassword(e.target.value)} />
            </div>
            <button type="submit">Apply Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordForm;