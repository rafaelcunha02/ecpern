import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage'; 
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
    setUser(supabase.auth.getUser());
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      <UserContext.Provider value={user}> {/* Provide UserContext */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="SignUp" element={<SignUpPage />} />
            <Route path="Login" element={<LoginPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </SupabaseContext.Provider>
  );
}

export default App;