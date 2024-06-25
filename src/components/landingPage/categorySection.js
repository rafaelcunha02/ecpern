import React from 'react';
import { Link } from 'react-router-dom';
import '../../common.css';

const CategorySection = ({ categories }) => {
    return (
        <main>
            <section id="category">
                <h1>Choose your desired category</h1>
                <div>
                    <ul>
                        {categories.map((category) => {
                            const imgUrl = category.caracImg; 
                            return (
                                <li key={category.caracValue} onClick={() => window.location=`/search?search=&category=${category.caracValue}`}>
                                    <Link to={`/search?search=&category=${category.caracValue}`}>
                                        <img src={imgUrl} alt="placeholder" />
                                        <h2>{category.caracValue}</h2>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default CategorySection;