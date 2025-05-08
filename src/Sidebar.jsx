import React from 'react';
import './Sidebar.css'; // linking the sidebar styles
import './styles.css';
import { FaFlask, FaCalendarCheck, FaHeartbeat, FaProcedures, FaClinicMedical, FaUserMd, FaUsers } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

// Sidebar component takes a function from parent to handle menu clicks
const Sidebar = ({ onMenuClick, role }) => {
  return (
    <div className="sidebar">
      {/* Sidebar header */}
      <div className="sidebar-header">
        <div className="logo">+ Medic</div>
        <div className="divider"></div>
      </div>

      {/* Sidebar menu */}
      <ul className="sidebar-menu">
        {/* Conditional rendering based on role */}
        {role === 'front-desk' && (
          <>
            <li onClick={() => onMenuClick('home')}>
              <FaClinicMedical className="icon" />
              <span className="neww">Clinic List</span>
            </li>
            <li onClick={() => onMenuClick('doctors')}>
              <FaUserMd className="icon" />
              <span className="neww">Doctors</span>
            </li>
            <li onClick={() => onMenuClick('patients')}>
              <FaUsers className="icon" />
              <span className="neww">Patients</span>
            </li>
          </>
        )}

        {role === 'back-desk' && (
          <>
            <li onClick={() => onMenuClick('tests_medicines')}>
              <FaFlask className="icon" />
              <span className="neww">Tests and Medicines</span>
            </li>
            <li onClick={() => onMenuClick('book_room')}>
              <FaCalendarCheck className="icon" />
              <span className="neww">Book the Room</span>
            </li>
            <li onClick={() => onMenuClick('update_vitals')}>
              <FaHeartbeat className="icon" />
              <span className="neww">Update Vitals</span>
            </li>
            <li onClick={() => onMenuClick('procedure_scheduling')}>
              <FaProcedures className="icon" />
              <span className="neww">Update Tests</span>
            </li>
          </>
        )}

        {/* Logout option */}
        <div className="divider logout-divider"></div>
        <li onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}>
          <MdLogout className="icon" />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
