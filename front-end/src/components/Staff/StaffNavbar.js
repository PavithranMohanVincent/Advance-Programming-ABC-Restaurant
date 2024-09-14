import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons are included

const StaffNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignOut = () => {
    // Perform sign out logic here if needed 
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/staff" className="navbar-brand">
          <h3>ABC Restaurant</h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/staff-reservation" className="nav-link rounded-circle p-2">
                <i className="bi bi-calendar-check" style={{ fontSize: '1.5rem' }}></i>
                Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/staff-query" className="nav-link rounded-circle p-2">
                <i className="bi bi-question-circle" style={{ fontSize: '1.5rem' }}></i>
                Query
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/staff-feedback" className="nav-link rounded-circle p-2">
                <i className="bi bi-chat-left-text" style={{ fontSize: '1.5rem' }}></i>
                Review
              </Link>
            </li>
          </ul>
          <div className="ms-auto">
            <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StaffNavbar;
