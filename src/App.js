import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage'; 
import ProductPage from './components/ProductPage/ProductPage'; 
import './common.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;