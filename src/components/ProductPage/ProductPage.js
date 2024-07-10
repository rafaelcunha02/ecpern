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

  const [cartProducts, setCartProducts] = useState([]);


// Define a helper function to handle fetch requests
const fetchData = async (url, setter) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP error ' + res.status);
  const data = await res.json();
  setter(data);
};

useEffect(() => {
  if (loggedUser) {
    fetchData(`http://localhost:4005/api/users/id/${loggedUser.id}`, setCurrentUser)
      .catch(error => console.error('Fetch failed:', error))
      .finally(() => setLoading(false));
  }
}, [loggedUser]);

const { id } = useParams();
const [produto, setProduto] = useState(null);

useEffect(() => {
  fetchData(`http://localhost:4005/api/products/${id}`, setProduto)
    .catch(error => console.error('Fetch failed:', error));
}, [id]);

useEffect(() => {
  if (currentUser) {
    fetchData(`http://localhost:4005/api/orders/cart/${currentUser.id}`, setCartProducts)
      .catch(error => console.error('Fetch failed:', error))
      .finally(() => setLoading(false));
  }
}, [currentUser]);
  
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


  console.log("cart: ")
  console.log(cartProducts);

  return (
      <div>
        <Header isLoggedIn={currentUser} user={currentUser}/>
        <ProductDisplay user={currentUser} cartProducts={cartProducts}/>
        <RelatedProducts />
        <Footer />
      </div>
  );
}

export default ProductPage;
