import React, { useState } from 'react';
import supabase from '../../../Client';

const ProfileForm = ({ user, onSubmit }) => {
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [errors, setErrors] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data, error } = await supabase
      .from('Users')
      .update({
        username: username,
        firstName: firstName,
        lastName: lastName,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Supabase update error:', error);
      setErrors([`Supabase update error: ${JSON.stringify(error)}`]);
      return;
    }

    console.log('Supabase update response:', data);

    alert('Profile updated successfully');
  } catch (error) {
    console.error('Error:', error);
    setErrors([`Error: ${JSON.stringify(error)}`]);
  }
};

  return (
    <div id="EditProfileContainer">
      <div className="profile-section">
        <div className="profile-info">
          <h1>Edit Profile</h1>

          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}><em>{error}</em></p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="info-items">
              <label htmlFor="username">Username</label>
              <input minLength="3" maxLength="20" type="text" value={username}
                id="username" name="username" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="firstName">First Name</label>
              <input type="text" value={firstName}
                id="firstName" name="firstName" minLength="3" maxLength="20" onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="info-items">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" value={lastName}
                id="lastName" name="lastName" minLength="3" maxLength="20" onChange={e => setLastName(e.target.value)} />
            </div>
            <button type="submit">Apply Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;