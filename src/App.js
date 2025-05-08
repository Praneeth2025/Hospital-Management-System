import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sidebar.css';
import Signin from './Signin';

// Front Desk Components
import DoctorsPage from './Doctorpage';
import ClinicListTable from './ClinicList';
import OldPatients from './OldPatients';
import Appointment from './AddAppointmentPage';

// Back Desk Components
import TestsAndMedicines from './TestsAndMedicines';
import BookRoom from './BookRoom';
import UpdateVitals from './UpdateVitals';
import ProcedureScheduling from './ProcedureScheduling';

// Doctor Components
import MyProfile from './MyProfile';
import TodaysAppointment from './TodaysAppointment';
import PastPatients from './PastPatients';
import PatientDetails from './PatientDetails';

function ProtectedLayout({ isAuthenticated, onMenuClick, selectedMenu, userRole }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onMenuClick={onMenuClick} role={userRole} />
      <div
        style={{
          flex: 1,
          backgroundColor: 'white',
          margin: '20px',
          borderRadius: '20px',
          padding: '20px',
          fontFamily: 'Instrument Sans, sans-serif',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email && parsedUser?.role) {
          setIsAuthenticated(true);
          setUserRole(parsedUser.role);
        } else {
          setLoginError('Login Error: Invalid user role.');
        }
      } catch (err) {
        console.error('Failed to parse user:', err);
        setLoginError('Login Error: Invalid user data.');
      }
    }
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogin = (user) => {
    if (user?.role) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setLoginError('');
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Signin onLogin={handleLogin} />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout
              isAuthenticated={isAuthenticated}
              onMenuClick={handleMenuClick}
              selectedMenu={selectedMenu}
              userRole={userRole}
            />
          }
        >
          <Route
            index
            element={
              <>
                {/* Front-desk role routes */}
                {userRole === 'front-desk' && (
                  <>
                    {selectedMenu === 'home' && <ClinicListTable />}
                    {selectedMenu === 'doctors' && <DoctorsPage />}
                    {selectedMenu === 'patients' && <OldPatients />}
                  </>
                )}

                {/* Back-desk role routes */}
                {userRole === 'back-desk' && (
                  <>
                    {selectedMenu === 'tests_medicines' && <TestsAndMedicines />}
                    {selectedMenu === 'book_room' && <BookRoom />}
                    {selectedMenu === 'update_vitals' && <UpdateVitals />}
                    {selectedMenu === 'procedure_scheduling' && <ProcedureScheduling />}
                  </>
                )}

                {/* Doctor role routes */}
                {userRole === 'doctor' && (
                  <>
                    {selectedMenu === 'my_profile' && <MyProfile />}
                    {selectedMenu === 'todays_appointment' && <TodaysAppointment />}
                    {selectedMenu === 'past_patients' && <PastPatients />}
                  </>
                )}
              </>
            }
          />

          {/* Common and Role-Specific Nested Routes */}
          {(userRole === 'front-desk' || userRole === 'doctor') && (
            <Route path="patient-details/:patientId" element={<PatientDetails />} />
          )}

          {userRole === 'front-desk' && (
            <Route path="add-appointment" element={<Appointment />} />
          )}
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>

      {/* Optional Login Error Display */}
      {loginError && <div style={{ color: 'red', textAlign: 'center' }}>{loginError}</div>}
    </Router>
  );
}

export default App;
