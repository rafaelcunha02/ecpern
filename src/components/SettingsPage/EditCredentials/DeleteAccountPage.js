import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SideMenu from '../SideMenu';
import DeleteAccountForm from './DeleteAccountForm';
import '../../../common.css';
import {UserContext} from '../../../App';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';



const DeleteAccountPage = () => {
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState('account');
    const [error, setError] = useState(null);
    const location = useLocation();


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


    if (loading || !loggedUser || !currentUser) return null;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser}/>
            <DeleteAccountForm user={currentUser} />
            <SideMenu user={currentUser}/>
        </div>
    );
}

export default DeleteAccountPage;