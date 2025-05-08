import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingTestModal = ({ isOpen, onClose, selectedPatients }) => {
  const [pendingTests, setPendingTests] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchPendingTests = async () => {
      try {
        const allTests = [];

        // Fetch tests for all selected patients
        for (const patient of selectedPatients) {
          const res = await axios.get(`http://localhost:3000/pending-tests/${patient.patient_id}`);
          allTests.push(...res.data);
        }

        setPendingTests(allTests);
      } catch (err) {
        console.error("Error fetching pending tests:", err);
      }
    };

    if (isOpen && selectedPatients.length > 0) {
      fetchPendingTests();
    }
  }, [isOpen, selectedPatients]);

  // Handle result input change
  const handleChange = (testId, value) => {
    setResults((prev) => ({
      ...prev,
      [testId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const updates = [];
      let doctorEmail = null;

      // Loop through selected patients and their pending tests
      for (const patient of selectedPatients) {
        const patientTests = pendingTests.filter(
          (test) => test.patient_id === patient.patient_id
        );

        // For each test, check if a result has been entered
        patientTests.forEach((test) => {
          if (results[test.test_id]) {
            // Add the result to the updates array
            updates.push({
              test_id: test.test_id,
              test_name: test.test_name, // Add test_name here
              test_result: results[test.test_id],
              doctor_email: patient.doctor_email, // Include doctor_email
            });

            // Store the first doctor email (assuming all tests for a patient have the same doctor)
            if (!doctorEmail) {
              doctorEmail = patient.doctor_email;
            }
          }
        });
      }

      // Check if no results were provided
      if (updates.length === 0) {
        alert("No test results to submit.");
        return;
      }

      // Send the updates to the backend
      await axios.post("http://localhost:3000/update-test-results", {
        updates,
        doctorEmails: doctorEmail, // Send one doctor email (common for all selected patients)
      });

      // Success
      alert("Test results updated and email sent to the doctor.");
      onClose();
    } catch (err) {
      console.error("Error updating test results:", err);
      alert("Failed to update test results.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContent">
        <h2 className="text-xl font-bold mb-4">Update Test Results</h2>
        {pendingTests.length === 0 ? (
          <p>No pending tests found.</p>
        ) : (
          <div className="space-y-4">
            {pendingTests.map((test) => (
              <div key={test.test_id} className="flex items-center gap-4">
                <span className="w-40 font-medium">{test.test_name}</span>
                <input
                  type="text"
                  placeholder="Enter result"
                  value={results[test.test_id] || ""}
                  onChange={(e) => handleChange(test.test_id, e.target.value)}
                  className="input w-1/2 p-2 border rounded"
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="button secondary bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="button primary bg-blue-600 text-white p-2 rounded">
            Submit Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingTestModal;
