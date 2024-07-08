import React, { useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SellForm from './SellForm';
import './sellPage.css';


const SellPage = () => {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [loading, setLoading] = useState(true);
    
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);

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

    useEffect (() => {
        fetch('http://localhost:4005/api/products/withsellers')
        .then(res => res.json())
        .then(data => {
            setProdutos(data);
        })
        .catch(error => console.error('Fetch failed:', error));
    }, []);

    useEffect (() => {
        fetch('http://localhost:4005/api/categories')
        .then(res => res.json())
        .then(data => {
            setCategorias(data);
        })
        .catch(error => console.error('Fetch failed:', error));
    }, []);

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <SellForm user={currentUser} categories={categorias} sizes={Array(0)} conditions={Array(0)} />
            <Footer/>
        </div>
    );
}

export default SellPage;