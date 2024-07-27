import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../common.css';
import './admin.css';
import { AdminPage, SideMenuAdmin, UsersAdmin, OrdersAdmin } from './AdminPage';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';

const AdminPanel = () => {
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [error, setError] = useState(null);

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
        fetchData(`http://localhost:4005/api/users/id/${loggedUser.id}`, setCurrentUser);
        setLoading(false);
    }
}, [loggedUser]);


    const location = useLocation();
    const { pathname } = location;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;




    return (
        <div>
          <Header isLoggedIn={currentUser} user={currentUser} />
          <SideMenuAdmin />
          {pathname === '/admin' && <UsersAdmin />}
          {pathname === '/admin/orders' && <OrdersAdmin />}
          {pathname !== '/admin' && pathname !== '/admin/orders' && <CaracteristicsAdmin />}
        </div>
      );
    }

export default AdminPanel;