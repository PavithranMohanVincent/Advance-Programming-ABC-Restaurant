import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Admin from './Admin';
import AdminFacility from './AdminFacility';
import AdminNavbar from './AdminNavbar';
import AdminReservation from './AdminReservation';
import AdminOther from './AdminOther';
import AdminUser from './AdminUser';
import AdminQuery from './AdminQuery';

function AdminRoutes() {
    const location = useLocation();

    
    const navbarRoutes = [
        '/admin',
        '/admin-facility',
        '/admin-reservation',
        '/admin-other',
        '/admin-user',
        '/admin-query'
    ];

    return (
        <>
            {navbarRoutes.includes(location.pathname) && (
                <AdminNavbar />
            )}

            <Routes>
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin-facility' element={<AdminFacility />} />
                <Route path='/admin-reservation' element={<AdminReservation />} />
                <Route path='/admin-other' element={<AdminOther />} />
                <Route path='/admin-user' element={<AdminUser />} />
                <Route path='/admin-query' element={<AdminQuery />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;
