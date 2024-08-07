import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductsGridSearch from './SearchGrid';
import '../../common.css';
import './searchPage.css';
import {UserContext} from '../../App';

const SearchPage = () => {
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const params = useParams();
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    const fetchData = async (url, setter) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();
            setter(data);
        } catch (error) {
            console.error('Fetch failed:', error);
            setError('Failed to fetch data');
        }
    };

useEffect(() => {
    if (loggedUser) {
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`, setCurrentUser);
    }
}, [loggedUser]);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/products/withsellers`, setProdutos);
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/caracs`, setCategorias);
        if(params){
            if(params.input){
                setCurrentInput(params.input);
            }
            if(params.category){
                setCurrentCategory(params.category);
            }
        }
        setLoading(false);
    }, [params]);

    useEffect(() => {
        if(currentUser){
            fetchData(`${process.env.REACT_APP_API_BASE_URL}/orders/cart/${loggedUser.id}`, setCart);
        }
    }
    , [currentUser]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    console.log(cart);


    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <ProductsGridSearch products={produtos} caracs={categorias} currentInput={currentInput} currentCategory={currentCategory} cartProducts={cart} currentUser={currentUser} />
            <Footer user={currentUser}/>
        </div>
    );
}

export default SearchPage;