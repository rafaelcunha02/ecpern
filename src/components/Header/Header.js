// Header.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import '../../common.css';
import supabase from '../../Client';
import { UserContext } from '../../App';
import { useParams} from 'react-router-dom';

const Header = ({ isLoggedIn, user, currentInput, setCurrentInput, heroSearch }) => {

//LANDING PAGE SCROLL EFFECTS:

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.pathname === '/') {
        console.log("on landing page");
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        console.log(isScrolled)
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 435){
        setShowSearchBar(true);
      }
      else {
        setShowSearchBar(false);
      }

    }
    }
    else{
        console.log("not on landing page");
        setIsScrolled(true);
        setShowSearchBar(true);
        
    }
  }, [location.pathname]);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
        if(showMenu){
            let lateralmenu = document.querySelector('.menu-lateral');
            let clickInMenu = lateralmenu.contains(e.target);
            let hamburguer = document.querySelector('.hamburger');
            let clickInHamburguer = hamburguer.contains(e.target);
            if (!clickInMenu && !clickInHamburguer){
                setShowMenu(false);
                console.log("click outside");
            }
            else{
                console.log("click inside");
            }
        }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    }
}, [showMenu]);

    useEffect(() => {
        if(showMenu){
        document.body.style.overflow = 'hidden';
        console.log("hidden")
        }
        else{
        document.body.style.overflow = 'auto';
        console.log("auto");
        }
    }, [showMenu]);

    useEffect(() => {
        if(params.input){
            setCurrentInput(params.input);
        let searchInput = document.getElementById('searchInput');
        searchInput.value = params.input;}
    }, [params.input]);


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

    const handleWriteEvent = (input) => {
        if(setCurrentInput){
            setCurrentInput(input);
            console.log(currentInput);
        }

    }

    const handleKeydownEvent = (event, input) => {
        if(event.key === 'Enter'){
            if(input){
                navigate(`/search/${input}`);
            }
            else{
                navigate(`/search`);
            }
        }
    }

    return (
        <header id="header">
            <h1 style={{position: showMenu ? '' : "fixed"}} id="fixedHeader" className={isScrolled ? 'scrolled' : ''} >
                <div>
                    <input onClick={(e) => 
                                    {console.log("hamburguer"); 
                                    setShowMenu(true); 
                                    console.log(showMenu);
                                    e.stopPropagation();
                    }} type="checkbox" id="hamburger" />
                    <label className="hamburger" htmlFor="hamburger"></label>
                    <Link to="/"><div className="name" id="nomeheader">Vintech</div></Link>
                </div>
                <div className="left-header">
                    <div className="header-left" id="search">
                        <input style={showSearchBar ? {display: 'block', opacity: 1} : {display: 'none'}}
                        type="text" id="searchInput" 
                        onKeyDown={(event) => {handleKeydownEvent(event, event.target.value)}}
                        onChange={(event) => handleWriteEvent(event.target.value)} placeholder="Search Products..." />
                        <div className="searchImgContainer">
                            <img src='/assets/search-svgrepo-com.svg' id="searchImg" 
                            style={showSearchBar ? {display: 'block'} : {display: 'none'}}/>
                        </div>
                    </div>
                    <div className="left-header">
                        {isLoggedIn ? (
                            <>
                                <button id="announce" onClick={() => window.location.href=`/productSubmit/${user.username}`} className={isScrolled ? 'scrolled' : ''}>Sell a Product</button>
                                <div className="header-left" onClick={() => window.location.href=`/cart/${user.username}`}><img src='/assets/shopcart.svg' /></div>
                                <div className="header-left" id="perfil">
                                    <Link to={`/profile/${user.username}`}><img src='/assets/profile-1341-svgrepo-com.svg' alt="Profile" /></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <button id="announce" onClick={() => window.location.href='/productSubmit/0'} className={isScrolled ? 'scrolled' : ''}> Sell a Product</button>
                                <div className="header-left" onClick={() => window.location.href='/LogIn'}><img src='/assets/shopcart.svg' /></div>
                                <div className="header-left" id="perfil"><Link to="/LogIn"><img src='/assets/profile-1341-svgrepo-com.svg'/></Link></div>
                            </>
                        )}
                    </div>
                </div>
            </h1>
            {isLoggedIn ? (
                <div className={`menu-lateral ${showMenu ? 'animation' : ''}`}>
                    <ul>
                        <li><Link to={`/profile/${user.username}`}><button id="profile">Profile</button></Link></li>
                        {user.rank === 1 && <li><Link to="/admin/1"><button className="adminButton" id="admin">Admin</button></Link></li>}
                        <li><button id="LogOut" onClick={logout}>Log Out</button></li>
                    </ul>
                </div>
            ) : (
                <div className={`menu-lateral ${showMenu ? 'animation' : ''}`}>
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

