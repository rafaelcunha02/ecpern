import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './productPage.css';
import ProductDisplay from './ProductDisplay';
import RelatedProducts from './RelatedProducts';

const ProductPage = () => {

  //PRODUTO
  const user = {
    username: 'user',
    rank: 1
  };

  const logout = () => {
    console.log('Logout');
  }

  const { id } = useParams();
  const [produto, setProduto] = useState(null);

useEffect (() => {
  fetch(`http://localhost:4005/api/products/${id}`)
  .then(res => {
    if (!res.ok) { // if HTTP status is not OK
      throw new Error('HTTP error ' + res.status);
    }
    return res.json();
  })
  .then(data => {
    setProduto(data);
  })
  .catch(error => {
    console.error('Fetch failed:', error);
    // You could set produtos to a default value here if needed
  });
}, []);

  
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
        <ProductDisplay sessionId={1} categorias={categorias}/>
        <RelatedProducts />
        <Footer />
      </div>
  );
}

export default ProductPage;
