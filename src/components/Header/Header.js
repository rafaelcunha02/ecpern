// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../common.css';
import profileIcon from '../../assets/profile-1341-svgrepo-com.svg';
import searchIcon from '../../assets/search-svgrepo-com.svg';
import shopcartIcon from '../../assets/shopcart.svg';

const Header = ({ isLoggedIn, user, logout }) => {
    return (
        <header id="header">
            <h1 id="fixedHeader">
                <div>
                    <input type="checkbox" id="hamburger" />
                    <label className="hamburger" htmlFor="hamburger"></label>
                    <Link to="/"><div className="name" id="nomeheader">Vintech</div></Link>
                </div>
                <div className="left-header">
                    <div className="header-left" id="search">
                        <input type="text" id="searchInput" placeholder="Search Products..." />
                        <div className="searchImgContainer">
                            <img src={searchIcon} id="searchImg" />
                        </div>
                    </div>
                    <div className="left-header">
                        {isLoggedIn ? (
                            <>
                                <button id="announce" onClick={() => window.location.href=`/productSubmit/${user.username}`}>Sell a Product</button>
                                <div className="header-left" onClick={() => window.location.href=`/cart/${user.username}`}><img src={shopcartIcon} /></div>
                                <div className="header-left" id="perfil">
                                    <Link to={`/profile/${user.username}`}><img src={profileIcon} alt="Profile" /></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <button id="announce" onClick={() => window.location.href='/productSubmit/0'}>Sell a Product</button>
                                <div className="header-left" onClick={() => window.location.href='/LogIn'}><img src={shopcartIcon} /></div>
                                <div className="header-left" id="perfil"><Link to="/LogIn"><img src={profileIcon} /></Link></div>
                            </>
                        )}
                    </div>
                </div>
            </h1>
            {isLoggedIn ? (
                <div className="menu-lateral">
                    <ul>
                        <li><Link to={`/profile/${user.username}`}><button id="profile">Profile</button></Link></li>
                        {user.rank === 1 && <li><Link to="/admin/1"><button className="adminButton" id="admin">Admin</button></Link></li>}
                        <li><button id="LogOut" onClick={logout}>Log Out</button></li>
                    </ul>
                </div>
            ) : (
                <div className="menu-lateral">
                    <ul>
                        <li><Link to="/SignUp"><button id="register">Sign Up</button></Link></li>
                        <li><Link to="/LogIn"><button id="LogIn">Log In</button></Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;

