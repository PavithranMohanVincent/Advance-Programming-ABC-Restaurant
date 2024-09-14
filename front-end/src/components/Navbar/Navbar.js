import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from '../../assets/Customer.png';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin, isAuthenticated, handleSignOut }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h1>ABC</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link btn btn-outline-primary rounded-pill px-4">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link btn btn-outline-primary rounded-pill px-4">Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/facility" className="nav-link btn btn-outline-primary rounded-pill px-4">Service & Gallery</Link>
            </li>
            
                <li className="nav-item">
                  <Link to="/reservation" className="nav-link btn btn-outline-primary rounded-pill px-4">Reservation</Link>
                </li>
                <li className="nav-item">
                  <Link to="/query" className="nav-link btn btn-outline-primary rounded-pill px-4">Query</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link btn btn-outline-primary rounded-pill px-4">Review</Link>
                </li>
              
          </ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <button className="btn btn-danger" onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowLogin(true)}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
