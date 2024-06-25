import React from 'react';
import { Link } from 'react-router-dom';
import '../../common.css';

const Footer = ({ isLoggedIn, user }) => {
  return (
    <footer id="footer">
      <div className="footer-section">
        <h2 id="name">Vintech</h2>
        <p id="catchphrase">The Best Online Technology Marketplace</p>
      </div>
      <div className="footer-section">
        <h3 id="footer-categories"></h3>
      </div>
      <div className="footer-section">
        <div className="footer-links">
          {isLoggedIn ? (
            <>
              <Link to={`/profile/${user.username}`}>Profile</Link>
              <Link to="/logout">Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/signup">SignUp</Link>
              <Link to="/login">LogIn</Link>
            </>
          )}
        </div>
        <form id="footer-search-form" className="footer-search" action="/search" method="get">
          <input type="text" className="searchbar" id="footer-searchbar" name="query" placeholder="Search for products" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </footer>
  );
}

export default Footer;