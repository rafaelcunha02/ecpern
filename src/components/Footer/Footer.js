import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import '../../common.css';
import supabase from '../../Client';

const Footer = ({ user }) => {

  
  const [currentInput, setCurrentInput] = useState('');
  const navigate = useNavigate('');

  const handleWriteEvent = (input) => {
    setCurrentInput(input);
}

const handleKeydownEvent = (event, input) => {
    if(event.key === 'Enter'){
        if(input){
            navigate(`/search/input/${input}`);
        }
        else{
            navigate(`/search/input/`);
        }
    }
}

const searchEvent = (input) => {
  if(input){
    navigate(`/search/input/${input}`);
  }
  else{
    navigate(`/search/input/`);
  }
}

const logout = async () => {
  await supabase.auth.signOut();
  if(window.location.pathname != '/'){
      navigate('/');
      window.location.reload();
  }
  else {
      window.location.reload();
  }
}

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
          {user ? (
            <>
              <Link to={`/profile/${user.username}`}>Profile</Link>
              <Link onClick={logout}>Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </>
          )}
        </div>
        <form id="footer-search-form" className="footer-search" action="/search" method="get">
          <input onKeyDown={(event) => {handleKeydownEvent(event, event.target.value)}}
          onChange={(event) => handleWriteEvent(event.target.value)} type="text" className="searchbar" id="footer-searchbar" placeholder="Search for products" />
          <button id="footerSearch" onClick={() => searchEvent(currentInput)}>Search</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;