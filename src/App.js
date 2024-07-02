import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage'; 
import SearchPage from './components/SearchPage/SearchPage';
import './common.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;