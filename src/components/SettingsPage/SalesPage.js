import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideMenu from './SideMenu';
import '../../common.css';
import {UserContext} from '../../App';
import { useLocation } from 'react-router-dom';
import Sales from './Sales';
import { Routes, Route } from 'react-router-dom';



const SalesPage = () => {
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async (url, setter) => {
        try {
            console.log('Fetching URL:', url); // Log the URL being fetched
            const res = await fetch(url, { redirect: 'follow' });
            if (!res.ok) throw new Error('HTTP error ' + res.status);
    
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text(); // Read the response as text
                console.error('Response is not JSON:', text); // Log the response text
                throw new TypeError('Response is not JSON');
            }
    
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
            setLoading(false);
        }
    }, [loggedUser]);



    if (loading || !loggedUser || !currentUser) return null;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser}/>
            <Sales/>
            <SideMenu user={currentUser}/>
            <Footer user={currentUser}/>
        </div>
    );
}

export default SalesPage;