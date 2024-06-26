import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeroSection from './heroSection';
import ProductSection from './productSection';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../common.css';
import CategorySection from './categorySection';

const LandingPage = () => {


  //PRODUTOS
  const user = {
    username: 'user',
    rank: 1
  };

  const logout = () => {
    console.log('Logout');
  }

  const [produtos, setProdutos] = useState([]);

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
        <Header isLoggedIn={true} user={user} logout={logout}/>
        <HeroSection/>
        <CategorySection categories={categorias}/>
        <ProductSection products={produtos}/>
        <Footer />
      </div>
  );
}

export default LandingPage;
