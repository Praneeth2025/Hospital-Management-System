import React, { useEffect, useState } from "react";

const PatientDetails = ({ patientId }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://hopsital-management-system-backend.onrender.com/api/patients/${patientId}`);
        if (!response.ok) throw new Error("Failed to fetch patient details");

        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (!patientData) return <p>No data available.</p>;

  const {
    name,
    age,
    mobilenum,
    problem_description,
    allergies,
    current_medicines,
    current_doctor,
    room_no,
    medicines = [],
    tests = [],
    vitals = [],
  } = patientData;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Patient Details</h2>

      <div className="mb-4">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Mobile Number:</strong> {mobilenum}</p>
        <p><strong>Problem:</strong> {problem_description}</p>
        <p><strong>Allergies:</strong> {allergies}</p>
        <p><strong>Current Medicines:</strong> {current_medicines}</p>
        <p><strong>Doctor:</strong> {current_doctor}</p>
        <p><strong>Room No:</strong> {room_no}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Prescribed Medicines</h3>
        {medicines.length > 0 ? (
          <ul className="list-disc ml-5">
            {medicines.map((med, idx) => (
              <li key={idx}>
                {med.medicine_name} - {med.dosage} at {med.time_to_use}
              </li>
            ))}
          </ul>
        ) : (
          <p>No medicines prescribed.</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Tests</h3>
        {tests.length > 0 ? (
          <ul className="list-disc ml-5">
            {tests.map((test, idx) => (
              <li key={idx}>
                {test.test_name} —{" "}
                <a href={test.test_result} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  View Result
                </a>
                <div className="text-sm text-gray-600">
                  Test Date: {test.test_date} | Result Date: {test.result_arrival_date}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tests recorded.</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold">Vitals</h3>
        {vitals.length > 0 ? (
          <ul className="list-disc ml-5">
            {vitals.map((vital, idx) => (
              <li key={idx}>
                Pulse: {vital.pulse}, BP: {vital.blood_pressure}, Temp: {vital.temperature}°C
                <div className="text-sm text-gray-600">Monitored at: {vital.monitoring_time}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No vitals recorded.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
