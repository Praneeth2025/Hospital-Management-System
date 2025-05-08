import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onMenuClick, role }) => {
  const navigate = useNavigate();

  const handleClick = (path, menuKey) => {
    if (onMenuClick) {
      onMenuClick(menuKey);
    }
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">Medic</div>
      </div>
      <div className="divider"></div>
      <ul className="sidebar-menu">
        {/* Doctor Menu */}
        {role === 'doctor' && (
          <>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'my_profile')}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'todays_appointment')}>
                Today's Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'past_patients')}>
                Past Patients
              </NavLink>
            </li>
          </>
        )}

        {/* Front-desk Menu */}
        {role === 'front-desk' && (
          <>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'home')}>
                Clinic List
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'doctors')}>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'patients')}>
                Patients
              </NavLink>
            </li>
          </>
        )}

        {/* Back-desk Menu */}
        {role === 'back-desk' && (
          <>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'tests_medicines')}>
                Tests & Medicines
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'book_room')}>
                Book Room
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'update_vitals')}>
                Update Vitals
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={() => handleClick('/dashboard', 'procedure_scheduling')}>
                Procedure Scheduling
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
