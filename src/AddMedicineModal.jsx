import React, { useState, useEffect } from "react";
import "./AddMedicineModal.css";
import axios from "axios";

const AddMedicineModal = ({ isOpen, onClose, selectedPatients, medicines }) => {
  const [billingItems, setBillingItems] = useState([
    { medicine: "", dosage: "", duration: 0, quantity: 1 },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [showBilling, setShowBilling] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log("Selected Patients:", selectedPatients);
      setBillingItems([{ medicine: "", dosage: "", duration: 0, quantity: 1 }]);
      setShowBilling(false);
    }
  }, [isOpen, selectedPatients]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...billingItems];
    updatedItems[index][field] = field === "duration" || field === "quantity" ? parseInt(value) || 0 : value;
    setBillingItems(updatedItems);
  };

  const handleAddMedicine = () => {
    setBillingItems([...billingItems, { medicine: "", dosage: "", duration: 0, quantity: 1 }]);
  };

  const handleDelete = (index) => {
    const updatedItems = [...billingItems];
    updatedItems.splice(index, 1);
    setBillingItems(updatedItems);
  };

  const getMedicinePrice = (name) => {
    const match = medicines.find((m) => m.medicine_name.toLowerCase() === name.toLowerCase());
    return match ? match.cost : 0;
  };

  const calculateTotal = () => {
    return billingItems.reduce((acc, item) => {
      const cost = getMedicinePrice(item.medicine) * item.quantity;
      return acc + cost;
    }, 0);
  };

  const handleProceed = () => {
    const isValid = billingItems.every(
      (item) => item.medicine && item.dosage && item.duration > 0 && item.quantity > 0
    );
    if (!isValid) {
      alert("Please fill all fields correctly.");
      return;
    }
    setShowBilling(true);
  };

  const handleSubmit = async () => {
    if (selectedPatients.length === 0) {
      alert("No patient selected");
      return;
    }

    const patientId = selectedPatients[0]?.patient_id;
    if (!patientId) {
      alert("Patient ID is missing");
      return;
    }

    const formattedData = billingItems.map((item) => ({
      medicine_name: item.medicine,
      dosage: item.dosage,
      duration: item.duration,
      quantity: item.quantity,
      patient_id: patientId,
    }));

    try {
      await axios.post("http://localhost:3000/medicines/upload", {
        medicines: formattedData,
      });
      setSubmitted(true);
      onClose();
    } catch (error) {
      console.error("Failed to send medicines to backend:", error.response?.data || error.message);
      alert("Error submitting data. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Add Medicines</h2>

        <div className="form-group">
          <label htmlFor="patient-name" className="form-label">Patient name</label>
          <input
            type="text"
            id="patient-name"
            className="form-input"
            value={selectedPatients.map((p) => p.name).join(", ")}
            readOnly
          />
        </div>

        {!showBilling ? (
          <div className="form-group">
            <label className="form-label">Billing item</label>
            {billingItems.map((item, index) => (
              <div className="billing-item" key={index}>
                <select
                  className="billing-input"
                  value={item.medicine}
                  onChange={(e) => handleInputChange(index, "medicine", e.target.value)}
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((med) => (
                    <option key={med.medicine_id} value={med.medicine_name}>
                      {med.medicine_name} (${med.cost})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter Dosage"
                  className="billing-input"
                  value={item.dosage}
                  onChange={(e) => handleInputChange(index, "dosage", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Enter Duration (in days)"
                  className="billing-input"
                  value={item.duration}
                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Enter Quantity"
                  className="billing-input"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                />
                <button className="delete-button" onClick={() => handleDelete(index)}>×</button>
              </div>
            ))}
            <button className="add-medicine-button" onClick={handleAddMedicine}>
              + Add Medicine
            </button>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Billing Summary</label>
            <table className="table-summary">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {billingItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.medicine || "N/A"}</td>
                    <td>{item.quantity}</td>
                    <td>${getMedicinePrice(item.medicine) * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-row">
              <strong>Grand Total: ${calculateTotal()}</strong>
            </div>
          </div>
        )}

        <div className="button-group">
          {!showBilling ? (
            <button
              className="proceed-button"
              onClick={handleProceed}
              disabled={billingItems.some(
                (item) => !item.medicine || !item.dosage || item.duration <= 0 || item.quantity <= 0
              )}
            >
              Proceed →
            </button>
          ) : (
            <button className="proceed-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMedicineModal;
