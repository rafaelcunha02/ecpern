import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import './Profile.css';

function Profile({ user, currentUser, count}) {

    return (
        <div id="containerProfile">
            <section id="s1profile">
                <div>
                    <img id="profilePic" src="../assets/placeholder-1-1.webp" />
                </div>
                <div id="info" style={{border:"none"}}>
                    <div id="flex1">
                        <div id="name">{user.firstName} {user.lastName}</div>
                        {currentUser == user ? (
                            <button id="Edit">
                                <Link to={`/profileSettings/${user.username}`}>Settings</Link>
                            </button>
                        ) : (
                            <>
                                <button id="DM">Message</button>
                                <button id="Share">Share Profile</button>
                            </>
                        )}
                    </div>
                    <p id="username">@{user.username}</p>
                    <p id="numberproducts">Currently selling {count} products</p>
                </div>
            </section>
        </div>
    );
}

export default Profile;