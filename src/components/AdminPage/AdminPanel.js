import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../common.css';
import './admin.css';
import { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin } from './AdminPage';
import { UserContext } from '../../App';

const AdminPanel = () => {
    const loggedUser = React.useContext(UserContext);
    console.log(loggedUser);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [error, setError] = useState(null);

    const [selector, setSelector] = useState(0);

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
            fetchData(`https://vintech-ecommerce-pern.onrender.com/api/users/id/${loggedUser.id}`, setCurrentUser);
        }
        console.log(loggedUser);
    }, [loggedUser]);

    useEffect(() => {
        if (loggedUser) {
          fetchData(`https://vintech-ecommerce-pern.onrender.com/api/users/id/${loggedUser.id}`, setCurrentUser)
            .catch(error => console.error('Fetch failed:', error))
        }
        console.log(loggedUser);
      }, [loggedUser]);

    useEffect(() => {
        if(currentUser){
            if(currentUser.rank !== 1){
                window.location.href = '/';
            }
            else{
                setLoading(false);
            }
        }
        console.log(currentUser);
    }, [currentUser]);


    if (!currentUser) {
        return <div></div>;
    }

    if (loading) return <div></div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
          <Header isLoggedIn={currentUser} user={currentUser} />
          <SideMenuAdmin selector={selector} setSelector={setSelector}/>
          {selector === 0 && <UsersAdmin />}
          {selector === 1 && <OrdersAdmin currentUser={currentUser} />}
        </div>
      );
}

export default AdminPanel;