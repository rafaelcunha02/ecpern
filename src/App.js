import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage';
import ProfilePage from './components/ProfilePage/ProfilePage'; 
import SearchPage from './components/SearchPage/SearchPage';
import SignUpPage from './components/SignUp/SignUpPage';
import LoginPage from './components/SignIn/SignInPage';
import supabase from './Client';

export const SupabaseContext = createContext();
export const UserContext = createContext();

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

  console.log("next log is user: ")
  if (user) {
    console.log(user.email);
  } else {
    console.log('User is not yet loaded');
  }

  return (
    <SupabaseContext.Provider value={supabase}>
      <UserContext.Provider value={user}> {/* Provide UserContext */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="search/:input?" element={<SearchPage />} />
            <Route path="SignUp" element={<SignUpPage />} />
            <Route path="Login" element={<LoginPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </SupabaseContext.Provider>
  );
}

export default App;