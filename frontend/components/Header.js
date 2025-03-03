    import React from "react";
    import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


    export default function Header() {
    return (
        <nav className="navbar">
            <div className="logo">YOURLOGO</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/register" className="sign-in">Donate</Link>
                <Link to="/getallData">Request Blood</Link>
                <Link to="/about" className="sign-in">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/hall-of-fame" className="sign-in">HallOFame</Link>
            </div>
            <div className="social-icons">
                <FaFacebook />
                <FaInstagram />
                <FaYoutube />
            </div>
        </nav>
    );
    }
