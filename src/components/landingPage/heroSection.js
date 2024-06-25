import React from 'react';
import { Link } from 'react-router-dom';
import '../../common.css';


const HeroSection = () => {
    return (
            <header>
            <div className="hero">
                <div className="hero-text">
                <h1>Welcome to Vintech Marketplace</h1>
                <p>Discover quality second-hand tech and give your unused tech a new life.</p>
                </div>
                <input type="text" id="hero-input" className="hero-input" placeholder="Enter the desired Items for search"/>
            </div>
        </header>
    );
}

export default HeroSection;
    