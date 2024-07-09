import React, { useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cart from './Cart';
import './CartPage.css';


const CartPage = () => {

    const [produtos, setProdutos] = useState([]);

    const [categorias, setCategorias] = useState([]);
    const [tamanhos, setTamanhos] = useState([]);
    const [condicoes, setCondicoes] = useState([]);

    const [currentInput, setCurrentInput] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchCategorias = async () => {
            return fetch('http://localhost:4005/api/caracs/Categories')
                .then(res => res.json())
                .then(data => {
                    setCategorias(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        }

        const fetchTamanhos = async () => {
            return fetch('http://localhost:4005/api/caracs/Tamanho')
                .then(res => res.json())
                .then(data => {
                    setTamanhos(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        }

        const fetchCondicoes = async () => {
            return fetch('http://localhost:4005/api/caracs/Condition')
                .then(res => res.json())
                .then(data => {
                    setCondicoes(data);
                })
                .catch(error => console.error('Fetch failed:', error));
        };

        Promise.all([fetchCategorias(), fetchTamanhos(), fetchCondicoes()])
            .then(() => setLoading(false))
            .catch(error => console.error('Fetch failed:', error));
    }, []);

    if (!currentUser
        || !categorias
        || !tamanhos
        || !condicoes
    ) return <div>Loading...</div>;

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <Cart session={currentUser} products={produtos} />
            <Footer/>
        </div>
    );
}

export default CartPage;