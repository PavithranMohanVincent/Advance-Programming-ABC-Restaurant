import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminRoutes from './components/Admin/AdminRoutes';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Reservation from './components/Reservation/Reservation';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Facility from './components/Facility/Facility';
import StaffRoutes from './components/Staff/StaffRoutes';
import Query from './components/Query/Query';

function App() {
  const location = useLocation();

  const shouldShowFooter = location.pathname === '/';
  const shouldShowNavbar = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/staff');

  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // Perform any additional sign out logic if needed
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setIsAuthenticated={setIsAuthenticated} />}
      <div className="App">
        {shouldShowNavbar && (
          <Navbar 
            setShowLogin={setShowLogin} 
            isAuthenticated={isAuthenticated}
            handleSignOut={handleSignOut}
          />
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/facility' element={<Facility />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/query' element={<Query />} />
        </Routes>
        <AdminRoutes />
        <StaffRoutes />
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
