import React from 'react';
import { Link } from 'react-router-dom';

const EditCredentialsForm = ({ user }) => {
  const { username } = user;

  return (
    <div id="EditProfileContainer">
      <div className="profile-section" id="change">
        <div className="profile-info">
          <h1>Manage Credentials</h1>

          <Link to={`../account/email`}>
            <div className="info-items">
              <label htmlFor="email">Change E-mail</label>
            </div>
          </Link>
          <Link to={`../account/password`}>
            <div className="info-items">
              <label htmlFor="oldPassword">Change Password</label>
            </div>
          </Link>
          <Link to={`../account/delete`}>
            <div className="info-items">
              <label htmlFor="oldPassword">Delete Account</label>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditCredentialsForm;