import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './productPage.css';
import ProductDisplay from './ProductDisplay';
import RelatedProducts from './RelatedProducts';
import CommentSection from './CommentSection';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const loggedUser = React.useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const navigate = useNavigate();


  // Helper function remains the same
  const fetchData = async (url, setter) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    const data = await res.json();
    setter(data);
  };

  // Adjusted to handle null loggedUser
  useEffect(() => {
    if (loggedUser) {
      fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`, setCurrentUser)
        .catch(error => console.error('Fetch failed:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Ensure loading is set to false even if no user is logged in
    }
  }, [loggedUser]);

  // Fetch product details regardless of user login
  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`, setProduto)
      .catch(error => console.error('Fetch failed:', error));
  }, [id]);

  // Adjusted to handle null currentUser
  useEffect(() => {
    if (currentUser) {
      fetchData(`${process.env.REACT_APP_API_BASE_URL}/orders/cart/${currentUser.id}`, setCartProducts)
        .catch(error => console.error('Fetch failed:', error))
        .finally(() => setLoading(false));
    }
  }, [currentUser]);

  // Fetch categories regardless of user login
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/caracs/Categories`)
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header isLoggedIn={currentUser} user={currentUser} />
      <ProductDisplay user={currentUser} cartProducts={cartProducts} />
      <CommentSection user={currentUser} />
      <RelatedProducts user={currentUser} />
      <Footer user={currentUser}/>
      </div>
  );
};

export default ProductPage;