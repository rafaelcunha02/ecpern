import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideMenu from './SideMenu';
import ProfileForm from './EditProfile/ProfileForm';
import '../../common.css';
import {UserContext} from '../../App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './profileSettings.css';

const SettingsPage = () => {
    const loggedUser = React.useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`, setCurrentUser);
            setLoading(false);
        }
    }, [loggedUser]);

    if (loading || !loggedUser || !currentUser) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header isLoggedIn={currentUser} user={currentUser} />
            <SideMenu user={currentUser}/>
            <ProfileForm user={currentUser} />
            <Footer user={currentUser}/>
        </div>
    );
}

export default SettingsPage;