import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import "./Header.css"; // Ensure you have a CSS file for styling


export default function Header() {
    return (
        <nav className="navbar">
            <div className="logo">YOURLOGO</div>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/register" className="sign-in">Donate</NavLink>
                <NavLink to="/getallData">Request Blood</NavLink>
                <NavLink to="/about" className="sign-in">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/hall-of-fame" className="sign-in">HallOFame</NavLink>
            </div>
            <div className="social-icons">
                <FaFacebook />
                <FaInstagram />
                <FaYoutube />
            </div>
        </nav>
    );
}
