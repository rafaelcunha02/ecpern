import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import useParams from 'react-router-dom';
import '../../common.css';


const HeroSection = ({heroSearch, setHeroSearch}) => {
    const navigate = useNavigate();

    const handleHeroSearch = (event, value) => {
        if(event.key !== 'Enter') return
        setHeroSearch(value)
        navigate('/search/input/' + value)
    }

    return (
            <header>
            <div className="hero">
                <div className="hero-text">
                <h1>Welcome to Vintech Marketplace</h1>
                <p>Discover quality second-hand tech and give your unused tech a new life.</p>
                </div>
                <input type="text" onKeyDown={(event) => handleHeroSearch(event, event.target.value)} id="hero-input" className="hero-input" placeholder="Enter the desired Items for search"/>
            </div>
        </header>
    );
}

export default HeroSection;
    