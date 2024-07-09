import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './productPage.css';
import ProductDisplay from './ProductDisplay';
import RelatedProducts from './RelatedProducts';
import {UserContext} from '../../App';


const ProductPage = () => {
  const loggedUser = React.useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUser = async () => {
      try {
          const usuario = await loggedUser;
          setCurrentUser(usuario);
      } catch (error) {
          console.error('Failed to fetch user:', error);
      }
      };

      fetchUser();
    }, [loggedUser]);

  useEffect(() => {
    const fetchUser = async () => {
        if (loggedUser) {
            const res = await fetch(`http://localhost:4005/api/users/id/${loggedUser.id}`);
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();
            setCurrentUser(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
        }
    };

    Promise.all([fetchUser()])
        .then(() => setLoading(false)) 
        .catch(error => console.error('Fetch failed:', error));
}, []);

  const { id } = useParams();
  const [produto, setProduto] = useState(null);

useEffect (() => {
  fetch(`http://localhost:4005/api/products/${id}`)
  .then(res => {
    if (!res.ok) { 
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

  if (loading) return <div>Loading...</div>; // Show a loading message while loading


  return (
      <div>
        <Header isLoggedIn={currentUser} user={currentUser}/>
        <ProductDisplay user={currentUser} categorias={categorias}/>
        <RelatedProducts />
        <Footer />
      </div>
  );
}

export default ProductPage;
