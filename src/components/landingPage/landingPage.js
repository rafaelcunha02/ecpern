import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeroSection from './heroSection';
import ProductSection from './productSection';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../common.css';
import CategorySection from './categorySection';
import { UserContext } from '../../App';

const LandingPage = () => {

  //USER
  const loggedUser = React.useContext(UserContext);
  console.log("LOGGED USER: " + loggedUser)


  const [user,setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usuario = await loggedUser;
        setUser(usuario);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
  
    fetchUser();
  }, [loggedUser]);

useEffect(() => {
  // Check if user is logged in
  if (loggedUser) {
    fetch(`http://localhost:4005/api/users/id/${loggedUser.id}`)
      .then(res => {
        if (!res.ok) { // if HTTP status is not OK
          throw new Error('HTTP error ' + res.status);
        }
        return res.json();
      })
      .then(data => {
        setUser(data); // Set the user state to the fetched data
      })
      .catch(error => {
        console.error('Fetch failed:', error);
        // You could set user to a default value here if needed
      });
  }
}, [loggedUser]); // Depend on loggedUser so the effect runs whenever loggedUser changes

  console.log("user: " + user)  

const [produtos, setProdutos] = useState([]);
  

  const logout = () => {
    console.log("Logout");
  }

useEffect (() => {
  fetch('http://localhost:4005/api/products/withsellers')
  .then(res => {
    if (!res.ok) { // if HTTP status is not OK
      throw new Error('HTTP error ' + res.status);
    }
    return res.json();
  })
  .then(data => {
    setProdutos(data);
  })
  .catch(error => {
    console.error('Fetch failed:', error);
    // You could set produtos to a default value here if needed
  });
}, []);


  console.log(Array.isArray(produtos));
  console.log(produtos);
  
  //////////////////////////////////////

  //CATEGORIAS
  console.log(user);
  const [categorias, setCategorias] = useState([]);

  useEffect (() => {
    fetch('http://localhost:4005/api/caracs/Categories')
    .then(res => {
      if (!res.ok) { 
        throw new Error('HTTP error ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      setCategorias(data);
    })
    .catch(error => {
      console.error('Fetch failed:', error);
    });
  }, []);



  return (
      <div>
        <Header isLoggedIn={user} user={user} logout={logout}/>
        <HeroSection/>
        <CategorySection categories={categorias}/>
        <ProductSection products={produtos}/>
        <Footer />
      </div>
  );
}

export default LandingPage;
