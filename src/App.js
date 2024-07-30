import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage';
import ProfilePage from './components/ProfilePage/ProfilePage'; 
import SearchPage from './components/SearchPage/SearchPage';
import SellPage from './components/SellPage/SellPage';
import EditPage from './components/SellEditPage/EditPage';
import CartPage from './components/CartPage/CartPage'
import SignUpPage from './components/SignUp/SignUpPage';
import LoginPage from './components/SignIn/SignInPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import CredentialsPage from './components/SettingsPage/CredentialsPage';
import DeleteAccountPage from './components/SettingsPage/EditCredentials/DeleteAccountPage';
import EmailFormPage from './components/SettingsPage/EditCredentials/EmailFormPage';
import PasswordFormPage from './components/SettingsPage/EditCredentials/PasswordFormPage';
import OrdersPage from './components/SettingsPage/OrdersPage';
import SalesPage from './components/SettingsPage/SalesPage';
import AdminPanel from './components/AdminPage/AdminPanel';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import supabase from './Client';

export const SupabaseContext = createContext();
export const UserContext = createContext();

const stripePromise = loadStripe('pk_test_51PhblQD30EyofdUR6BTc6EcNMg1yEuSOYQl8XtipyqHEZM3zqtYqo7xIm7CUrWjY2mxmpIngIOBoWXUSU3V9zWTp00qmwsXIQV');

const App = () => {
  const [user, setUser] = useState(null);

  // Check the user's login state when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const info = await supabase.auth.getUser();
        setUser(info.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      <UserContext.Provider value={user}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="search/input/:input?" element={<SearchPage />} />
            <Route path="search/category/:category?" element={<SearchPage />} />
            <Route path="sell/:username?" element={<SellPage />} />
            <Route path="edit/:productId" element={<EditPage />} />
            <Route 
              path="Cart/:username?" 
              element={
                <Elements stripe={stripePromise}>
                  <CartPage />
                </Elements>
              } 
            />
            <Route path="SignUp" element={<SignUpPage />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="account" element={<CredentialsPage />} />
            <Route path="account/email" element={<EmailFormPage />} />
            <Route path="account/password" element={<PasswordFormPage />} />
            <Route path="account/delete" element={<DeleteAccountPage />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="sales" element={<SalesPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </SupabaseContext.Provider>
  );
}

export default App;