import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import LoginPopup from '../LoginPopup/LoginPopup'; // Import LoginPopup component

const AdminNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); 

    // Redirect to login page or homepage
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/admin-reservation" className="navbar-brand">
          <h1>ABC Restaurant</h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/admin-facility" className="nav-link">Facility</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-reservation" className="nav-link">Reservation</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-query" className="nav-link">Query</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-other" className="nav-link">Reviews</Link>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </nav>
  );
}

export default AdminNavbar;
