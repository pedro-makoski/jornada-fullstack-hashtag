import React from "react";
import "../../vars.css"
import "./header.css"
import logoSpotify from "../../assets/logo/spotify-logo.png"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <img src={logoSpotify} alt="Logo do spotify" />
            <Link to="/" className="header__link">
                <h1>Spotify</h1>
            </Link>
        </header>
    )
}

export default Header