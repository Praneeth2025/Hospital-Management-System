import React from "react";
import { NavLink } from "react-router-dom";
import "./VerticalNavMenu.css";

export default function VerticalNavMenu() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Messages", path: "/messages", badge: 21 },
    { name: "Settings", path: "/settings" },
    { name: "Integrations", path: "/integrations", badge: 8 },
  ];

  const socialLinks = [
    { name: "Communities", path: "/communities" },
    { name: "Twitter", path: "/twitter", linked: true },
    { name: "Facebook", path: "/facebook" },
    { name: "Instagram", path: "/instagram" },
    { name: "Figma", path: "/figma", linked: true },
  ];

  return (
    <div className="nav-container">
      <div className="menu-section">
        <h2 className="logo">My App</h2>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.name}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </NavLink>
        ))}
      </div>

      <div className="social-section">
        <h4>SOCIAL</h4>
        {socialLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{link.name}</span>
            {link.linked && <span className="linked">Linked</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
