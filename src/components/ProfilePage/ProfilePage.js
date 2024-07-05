import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from './Profile';
import { UserContext } from '../../App';
import '../../common.css';

const ProfilePage = () => {

    const loggedUser = React.useContext(UserContext);
    console.log("LOGGED USER: " + loggedUser);

    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            if (loggedUser) {
                const res = await fetch(`http://localhost:4005/api/users/id/${loggedUser.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setCurrentUser(data);
            }
        };

        const fetchProfile = async () => {
            const res = await fetch(`http://localhost:4005/api/users/${username}`);
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();
            setUser(data);
        };

        const fetchProducts = async () => {
            if (user) {
                const res = await fetch(`http://localhost:4005/api/products/user/${user.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setProducts(data);
            }
        };

        Promise.all([fetchUser(), fetchProfile(), fetchProducts()])
            .then(() => setLoading(false)) // Set loading to false after all fetches are done
            .catch(error => console.error('Fetch failed:', error));
    }, []);

    if (loading) return <div>Loading...</div>; // Show a loading message while loading

    return (
        <div>
            <Header />
            <Profile user={user} currentUser={currentUser} />
            <Footer />
        </div>
    );
}

export default ProfilePage;