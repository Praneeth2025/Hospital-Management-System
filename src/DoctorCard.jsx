import React from "react";
import './DoctorCard.css';

const DoctorCard = ({ doctor, onViewDetails }) => {
  return (
    <div
      className="doctor-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "15px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s",
        position: "relative",
      }}
    >
      <h3
        style={{
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#333",
        }}
      >
        {doctor.full_name}
      </h3>
      <div style={{ display: "flex", gap: "0px 12px" }}>
        <p style={{ fontSize: "16px", color: "#777", display: "flex" }}>
          <span role="img" aria-label="stethoscope">🩺</span>
          {doctor.specialization}
        </p>

        <p style={{ fontSize: "15px", color: "#666", display: "flex" }}>
          <span role="img" aria-label="clock">🕒</span>
          {doctor.op_timings}
        </p>

        <p style={{ fontSize: "15px", color: "#666", display: "flex" }}>
          <span role="img" aria-label="phone">📞</span>
          {doctor.contact_no}
        </p>
      </div>

      <p style={{
        fontSize: "14px",
        color: "#555",
        marginTop: "10px",
        display: "flex",
        maxWidth: "550px",
        whiteSpace: "normal",
        overflow: "hidden",
        textOverflow: "ellipsis",
        alignItems: "center",
        gap: "6px",
      }}>
        <span role="img" aria-label="info">ℹ️</span>
        {doctor.qualification || "No description available"}
      </p>

      <button className="view-button" onClick={onViewDetails}>View Doctor Details</button>
    </div>
  );
};

export default DoctorCard;
