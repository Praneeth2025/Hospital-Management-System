import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateVitalsModal.css";

const UpdateVitalsModal = ({ isOpen, onClose, selectedPatients }) => {
  const [vitals, setVitals] = useState({
    pulse: "",
    bloodPressure: "",
    temperature: "",
  });

  useEffect(() => {
    if (isOpen) {
      console.log("Selected Patients:", selectedPatients);
      setVitals({ pulse: "", bloodPressure: "", temperature: "" });
    }
  }, [isOpen, selectedPatients]);

  const handleChange = (field, value) => {
    setVitals((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (selectedPatients.length === 0) {
      alert("No patient selected");
      return;
    }

    const dataToSend = selectedPatients.map((patient) => ({
      patient_id: patient.patient_id,
      pulse: parseInt(vitals.pulse),
      bloodPressure: vitals.bloodPressure,
      temperature: parseFloat(vitals.temperature),
    }));

    console.log("Sending vitals:", dataToSend);

    try {
      await axios.post("https://hopsital-management-system-backend.onrender.com/vitals/update", dataToSend);

      // Success Alert
      alert("Vitals updated successfully!");

      // Close modal after success
      onClose();
    } catch (error) {
      console.error("Error updating vitals:", error.response?.data || error.message);
      
      // Error Alert
      alert("Error submitting vitals. Please try again.");
    }
  };

  if (!isOpen) return null;

  const patientNames = selectedPatients.map((p) => p.patient_name).join(", ");

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">Update Vitals</h2>
        <h3 className="patient-name-header">{patientNames}</h3>

        <div className="form-group">
          <label className="form-label">Blood Pressure</label>
          <input
            type="text"
            placeholder="e.g., 120/80"
            className="form-input"
            value={vitals.bloodPressure}
            onChange={(e) => handleChange("bloodPressure", e.target.value)}
          />

          <label className="form-label">Heart Rate (bpm)</label>
          <input
            type="number"
            className="form-input"
            value={vitals.pulse}
            onChange={(e) => handleChange("pulse", e.target.value)}
          />

          <label className="form-label">Temperature (°F)</label>
          <input
            type="number"
            className="form-input"
            value={vitals.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="proceed-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVitalsModal;
