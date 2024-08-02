import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from './Profile';
import UserProducts from './UserProducts';
import { UserContext } from '../../App';
import '../../common.css';

const ProfilePage = () => {

    const loggedUser = React.useContext(UserContext);
    console.log("LOGGED USER: " + loggedUser);

    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { username } = useParams();

    
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

    useEffect(() => {
        const fetchUser = async () => {
            if (loggedUser) {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/id/${loggedUser.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setCurrentUser(data);
            }
        };

        const fetchProfile = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${username}`);
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();
            setUser(data);
            fetchProducts(data);
        };

        const fetchProducts = async (user) => {
            if (user) {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/user/${user.id}`);
                if (!res.ok) throw new Error('HTTP error ' + res.status);
                const data = await res.json();
                setProducts(data);
            }
        };

        Promise.all([fetchUser(), fetchProfile()])
            .then(() => setLoading(false)) 
            .catch(error => console.error('Fetch failed:', error));
    }, []);

    if (loading) return <div></div>;

    return (
        <div>
            <Header isLoggedIn ={currentUser} user = {currentUser}/>
            <Profile user={user} currentUser={currentUser} count={products.length} />
            <UserProducts  user={user} currentUser={currentUser} sellingProducts={products} cartProducts={[]}/>
            <Footer user={currentUser}/>
        </div>
    );
}

export default ProfilePage;