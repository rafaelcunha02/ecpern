import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductsGridSearch from './SearchGrid';
import '../../common.css';
import './searchPage.css';
import {UserContext} from '../../App';

const SearchPage = () => {

  //PRODUTO

  const loggedUser = React.useContext(UserContext);
    console.log("LOGGED USER: " + loggedUser);

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);


    //USUARIO
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
    
    //informações do usuário
    useEffect(() => {
        const fetchUser = async () => {
            if (loggedUser) {
                const res = await fetch(`http://localhost:4005/api/users/id/${loggedUser.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setCurrentUser(data);
            }
        };

        Promise.all([fetchUser()])
            .then(() => setLoading(false)) 
            .catch(error => console.error('Fetch failed:', error));
    }, []);


  //PRODUTOS
  useEffect (() => {
    fetch('http://localhost:4005/api/products/withsellers')
    .then(res => {
      if (!res.ok) { 
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


  //CATEGORIAS
  useEffect(() => {
    fetch('http://localhost:4005/api/caracs')
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
      // You could set produtos to a default value here if needed
    });
  }, []);


  if (loading) return <div>Loading...</div>; // Show a loading message while loading
  


  

  return (
      <div>
        <Header isLoggedIn={currentUser} user={currentUser}/>
        <ProductsGridSearch products={produtos} caracs={categorias}/>
        <Footer />
      </div>
  );
}

export default SearchPage;