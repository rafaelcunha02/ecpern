import React, { useState, useEffect } from 'react';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Buy from './Buy';
import './CartPage.css';


const BuyPage = () => {

    const location = useLocation();
    const { order } = location.state || {};
    console.log('order:', order);
    console.log(order);
    const [orders, setOrders] = useState([order]);
    
    const [seller, setSeller] = useState(null);

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


    if (!currentUser
        || !orders
    ) return <div>Loading buy page...</div>;

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} currentInput={currentInput} setCurrentInput={setCurrentInput} />
            <Buy orders={orders} currentUser={currentUser} />
            <Footer/>
        </div>
    );
}

export default BuyPage;