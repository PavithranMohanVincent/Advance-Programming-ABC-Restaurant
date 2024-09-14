import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin, setIsAuthenticated }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState(""); 
  const [userEmail, setUserEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [userType, setUserTypeInternal] = useState("customer"); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, userEmail, password, userType };

    if (currState === "Sign up") {
      try {
        const response = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          setCurrState("Login");
        } else {
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      // Login logic here
      if (userType === "admin") {
        navigate('/admin');
      } else if (userType === "staff") {
        navigate('/staff');
      } else if (userType === "customer") {
        navigate('/');
      } else {
        console.error('Invalid user type');
      }

      // Update authentication state
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{currState}</h5>
              <button type="button" className="btn-close" onClick={() => setShowLogin(false)} aria-label="Close"></button>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {currState === "Sign up" && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {currState === "Login" && (
                <div className="mb-3">
                  <select
                    className="form-select"
                    value={userType}
                    onChange={(e) => setUserTypeInternal(e.target.value)}
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
              )}
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" required />
                <label className="form-check-label">
                  By continuing, I agree to the terms of use & privacy policy
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {currState === "Sign up" ? "Create account" : "Login"}
              </button>
            </form>
          </div>
          <div className="modal-footer">
            {currState === "Login"
              ? <p>Don't have an account? <span onClick={() => setCurrState("Sign up")} className="text-primary cursor-pointer">Sign up here</span></p>
              : <p>Already have an account? <span onClick={() => setCurrState("Login")} className="text-primary cursor-pointer">Login here</span></p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
