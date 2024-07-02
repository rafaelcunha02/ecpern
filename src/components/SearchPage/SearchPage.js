import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './searchPage.css';
import ProductsGridSearch from './SearchGrid';
import '../../common.css';

const SearchPage = () => {

  //PRODUTO
  const user = {
    username: 'user',
    rank: 1
  };

  const logout = () => {
    console.log('Logout');
  }

  const { id } = useParams();


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
  

  
  //////////////////////////////////////

  //CATEGORIAS

  return (
      <div>
        <Header isLoggedIn={true} user={user} logout={logout}/>
        <ProductsGridSearch products={produtos} />
        <Footer />
      </div>
  );
}

export default SearchPage;