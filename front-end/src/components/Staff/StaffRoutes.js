import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Staff from './Staff';
import StaffNavbar from './StaffNavbar';
import StaffReservation from './StaffReservation';
import StaffFeedback from './StaffFeedback';
import StaffQuery from './StaffQuery';

function StaffRoutes() {
  const location = useLocation();


  const navbarRoutes = [
    '/staff',
    '/staff-reservation',
    '/staff-feedback',
    '/staff-other',
    '/staff-query'
  ];

  return (
    <>
      {navbarRoutes.includes(location.pathname) && (
        <StaffNavbar />
      )}

      <Routes>
        <Route path='/staff' element={<Staff />} />
        <Route path='/staff-reservation' element={<StaffReservation />} />
        <Route path='/staff-feedback' element={<StaffFeedback />} />
        <Route path='/staff-query' element={<StaffQuery />} />
      </Routes>
    </>
  );
}

export default StaffRoutes;
