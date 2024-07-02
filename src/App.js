import React, { createContext } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage'; 
import SearchPage from './components/SearchPage/SearchPage';
import SignUpPage from './components/SignUp/SignUpPage';
import LoginPage from './components/SignIn/SignInPage';
import supabase from './Client';

export const SupabaseContext = createContext();

const App = () => {
  return (
    <SupabaseContext.Provider value={supabase}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="Login" element={<LoginPage />} />
        </Routes>
      </Router>
    </SupabaseContext.Provider>
  );
}

export default App;