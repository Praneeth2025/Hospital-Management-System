import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddTestModal.css";

const AddTestModal = ({ isOpen, onClose, selectedPatients, tests: testOptions = [] }) => {
  const [testItems, setTestItems] = useState([{ test: "" }]);
  const [showBilling, setShowBilling] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTestItems([{ test: "" }]);
      setShowBilling(false);
    }
  }, [isOpen, selectedPatients]);

  const handleTestChange = (index, value) => {
    const updated = [...testItems];
    updated[index].test = value;
    setTestItems(updated);
  };

  const handleAddTest = () => {
    setTestItems([...testItems, { test: "" }]);
  };

  const handleDelete = (index) => {
    const updated = [...testItems];
    updated.splice(index, 1);
    setTestItems(updated);
  };

  const validateFields = () => testItems.every(item => item.test.trim() !== "");

  const getTestCost = (name) => {
    const match = testOptions.find(t => t.test_name.toLowerCase() === name.toLowerCase());
    return match ? match.cost : 0;
  };

  const calculateTotalCost = () => {
    return testItems.reduce((acc, item) => acc + getTestCost(item.test), 0);
  };

  const handleProceed = () => {
    if (!validateFields()) {
      alert("Please fill in all test names.");
      return;
    }
    setShowBilling(true);
  };

  const handleSubmit = async () => {
    const patientId = selectedPatients[0]?.patient_id;
    if (!patientId) {
      alert("Patient ID missing");
      return;
    }

    const formattedData = testItems.map(item => ({
      patient_id: patientId,
      test_name: item.test
    }));

    try {
      await axios.post("http://localhost:3000/tests/upload", { tests: formattedData });

      // ✅ Success Alert
      alert("Tests submitted successfully!");

      onClose();
    } catch (error) {
      console.error("Failed to submit test data:", error);
      alert("Submission failed. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Add Tests</h2>

        <div className="form-group">
          <label htmlFor="patient-name" className="form-label">Patient name</label>
          <input
            type="text"
            id="patient-name"
            className="form-input"
            value={selectedPatients.map(p => p.name).join(", ")}
            readOnly
          />
        </div>

        {!showBilling ? (
          <div className="form-group">
            <label className="form-label">Test item</label>
            {testItems.map((item, index) => (
              <div className="billing-item" key={index}>
                <input
                  type="text"
                  placeholder="Enter Test Name"
                  className="billing-input"
                  value={item.test}
                  onChange={(e) => handleTestChange(index, e.target.value)}
                  list="test-options"
                />
                {testItems.length > 1 && (
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
            <datalist id="test-options">
              {testOptions.map((test, i) => (
                <option key={i} value={test.test_name} />
              ))}
            </datalist>
            <button className="add-medicine-button" onClick={handleAddTest}>
              + Add Test
            </button>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Billing Summary</label>
            <table className="table-summary">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Test Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {testItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.test || "N/A"}</td>
                    <td>${getTestCost(item.test)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-row">
              <strong>Total Tests: {testItems.length}</strong><br />
              <strong>Grand Total: ${calculateTotalCost()}</strong>
            </div>
          </div>
        )}

        <div className="button-group">
          {!showBilling ? (
            <button
              className="proceed-button"
              onClick={handleProceed}
              disabled={!validateFields()}
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

export default AddTestModal;
