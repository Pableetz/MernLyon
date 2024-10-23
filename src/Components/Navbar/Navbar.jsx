import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/home">Publications</Link>
          </li>
          <li>
            <Link to="/home">Utilisateurs</Link>
          </li>
          <li>
            <Link to="/home">Profil</Link>
          </li>
        </ul>
      </nav>
      <h1> IPSSI - FORMATION</h1>
    </div>
  );
};

export default Navbar;
