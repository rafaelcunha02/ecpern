import React, { useState } from 'react';
import supabase from '../../../Client';

const EditPasswordForm = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = [];

  if (newPassword !== repeatPassword) {
    errors.push('Passwords do not match');
  }
  if (!newPassword) {
    errors.push('New password cannot be empty');
  }
  if (!oldPassword) {
    errors.push('Current password cannot be empty');
  }

  if (errors.length > 0) {
    setErrors(errors);
    return;
  }

  if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
    console.log("password: ", oldPassword, newPassword);
    throw new Error('Invalid password data');
  }

  try {
    // Sign in to verify current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (signInError) {
      throw new Error('Incorrect current password');
    }

    // Update user's password in Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      console.error('Supabase auth update error:', updateError.message);
      throw new Error(updateError.message);
    }

    alert('Password changed successfully');
  } catch (error) {
    console.error('Error:', error.message);
    setErrors([error.message]);
  }
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
            <div className="info-items">
              <label htmlFor="oldPassword">Current Password</label>
              <input type="password"
                id="oldPassword" name="oldPassword" onChange={e => setOldPassword(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="newPassword">New Password</label>
              <input type="password"
                id="newPassword" name="newPassword" onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className="info-items">
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