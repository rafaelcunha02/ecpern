import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideMenu = ({ user }) => {
  const location = useLocation();
  const { pathname } = location;
  const { username } = user;

  return (
    <aside id="sideOptions">
      <h1 style={{textAlign:"left"}}>Settings</h1>
      <ul>
        <Link to={`/settings`} className={pathname === `/settings` ? 'active' : ''}>
          <li>Profile Settings</li>
        </Link>
        <Link to={`/account`} className={['/account', '/account/delete', '/account/email', '/account/password'].includes(pathname) ? 'active' : ''}><li>Account Settings</li>
        </Link>
        <Link to={`/orders`} className={pathname === `/orders` ? 'active' : ''}>
          <li>Order History</li>
        </Link>
        <Link to={`/sales`} className={pathname === `/sales` ? 'active' : ''}>
          <li>Sales History</li>
        </Link>
      </ul>
    </aside>
  );
};

export default SideMenu;