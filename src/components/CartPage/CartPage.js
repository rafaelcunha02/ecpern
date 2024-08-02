import React, { useState, useEffect } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cart from './Cart';
import './CartPage.css';


const CartPage = () => {

    const [orders, setOrders] = useState([]);

    const [currentInput, setCurrentInput] = useState('');
    
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
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`);
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
        if(currentUser){

        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/cart/` + currentUser.id)
        .then(res => res.json())
        .then(data => {
            setOrders(data);
        })
        .catch(error => console.error('Fetch failed:', error));
        }
    }, [currentUser]);


    if (!currentUser
        || !orders
    ) return <div></div>;

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <Cart currentUser={currentUser} session={currentUser} orders={orders} setOrders={setOrders} />
            <Footer user={currentUser}/>
        </div>
    );
}

export default CartPage;