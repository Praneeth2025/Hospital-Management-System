import React from "react";
import "./Sidebar.css"; // linking the sidebar styles
import { FaFlask, FaCalendarCheck, FaHeartbeat, FaProcedures } from "react-icons/fa";  // Importing icons for visuals
import { MdLogout } from "react-icons/md";  // logout icon

// Sidebar component takes a function from parent to handle menu clicks
const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      
      {/* Top section with logo */}
      <div className="sidebar-header">
        <div className="logo">+ Medic</div> {/* Just the name/logo */}
        <div className="divider"></div> {/* Divider for clean UI */}
      </div>

      {/* Actual clickable menu */}
      <ul className="sidebar-menu">
        
        {/* Tests and Medicines section */}
        <li onClick={() => onMenuClick('tests_medicines')}>
          <FaFlask className="icon" /> {/* Test tube icon for tests and medicines */}
          <span className="neww">Tests and Medicines</span>
        </li>

        {/* Book the Room section */}
        <li onClick={() => onMenuClick('book_room')}>
          <FaCalendarCheck className="icon" /> {/* Calendar icon for booking rooms */}
          <span className="neww">Book the Room</span>
        </li>

        {/* Update Vitals section */}
        <li onClick={() => onMenuClick('update_vitals')}>
          <FaHeartbeat className="icon" /> {/* Heartbeat icon for update vitals */}
          <span className="neww">Update Vitals</span>
        </li>

        {/* Procedure Scheduling section */}
        <li onClick={() => onMenuClick('procedure_scheduling')}>
          <FaProcedures className="icon" /> {/* Procedure icon for scheduling */}
          <span className="neww">Update Tests</span>
        </li>

        {/* Divider before logout to separate it visually */}
        <div className="divider logout-divider"></div>

        {/* Logout option */}
        <li onClick={() => onMenuClick('logout')}>
          <MdLogout className="icon" />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
