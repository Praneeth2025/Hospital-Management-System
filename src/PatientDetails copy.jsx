import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/patients/${patientId}`, {
          method: 'GET',
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        console.log("API Response:", data);

        setPatientData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (loading) return <div className="center-text mt">Loading...</div>;
  if (!patientData || Object.keys(patientData).length === 0) {
    return <div className="center-text mt">No data available.</div>;
  }

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
    vitals = []
  } = patientData;

  return (
    <div className="container">
      <h1 className="header">Patient Details</h1>

      <div className="card">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Mobile Number:</strong> {mobilenum}</p>
        <p><strong>Problem:</strong> {problem_description}</p>
        <p><strong>Allergies:</strong> {allergies}</p>
        <p><strong>Current Medicines:</strong> {current_medicines}</p>
        <p><strong>Doctor:</strong> {current_doctor}</p>
        <p><strong>Room No:</strong> {room_no}</p>
      </div>

      <div className="card">
        <h2 className="sub-header">Prescribed Medicines</h2>
        {medicines.length > 0 ? (
          <ul>
            {medicines.map((med, idx) => (
              <li key={idx}>
                <strong>{med.medicine_name}</strong> - {med.dosage} at {med.time_to_use}
              </li>
            ))}
          </ul>
        ) : <p>No medicines prescribed.</p>}
      </div>

      <div className="card">
        <h2 className="sub-header">Tests</h2>
        {tests.length > 0 ? (
          <ul>
            {tests.map((test, idx) => (
              <li key={idx}>
                <strong>{test.test_name}</strong>:&nbsp;
                <a href={test.test_result} target="_blank" rel="noopener noreferrer">Click here</a><br />
                <span className="small-text">
                  Test Date: {test.test_date} | Result Arrival: {test.result_arrival_date}
                </span>
              </li>
            ))}
          </ul>
        ) : <p>No tests conducted.</p>}
      </div>

      <div className="card">
        <h2 className="sub-header">Vitals</h2>
        {vitals.length > 0 ? (
          <ul>
            {vitals.map((vital, idx) => (
              <li key={idx}>
                Pulse: {vital.pulse}, BP: {vital.blood_pressure}, Temp: {vital.temperature}°C<br />
                <span className="small-text">
                  Monitored at: {vital.monitoring_time}
                </span>
              </li>
            ))}
          </ul>
        ) : <p>No vitals recorded.</p>}
      </div>
    </div>
  );
};

export default PatientDetails;
