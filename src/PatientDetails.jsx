import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://hopsital-management-system-backend.onrender.com/api/patients/${patientId}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        console.log('Fetched patient data:\n', JSON.stringify(data, null, 2)); // ⬅️ Console log
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!patientData) {
    return <div className="text-center mt-10 text-red-500">No patient data found.</div>;
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
    vitals = [],
  } = patientData;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Patient Details</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-2">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Mobile Number:</strong> {mobilenum}</p>
        <p><strong>Problem:</strong> {problem_description}</p>
        <p><strong>Allergies:</strong> {allergies}</p>
        <p><strong>Current Medicines:</strong> {current_medicines}</p>
        <p><strong>Doctor:</strong> {current_doctor}</p>
        <p><strong>Room No:</strong> {room_no}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Prescribed Medicines</h2>
        {medicines.length === 0 ? (
          <p className="text-gray-500">No medicines prescribed.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {medicines.map((med, idx) => (
              <li key={idx}>
                <strong>{med.medicine_name}</strong> - {med.dosage} at {med.time_to_use}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Tests</h2>
        {tests.length === 0 ? (
          <p className="text-gray-500">No tests available.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {tests.map((test, idx) => (
              <li key={idx}>
                <strong>{test.test_name}</strong>:&nbsp;
                <a href={test.test_result} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Result
                </a>
                <br />
                <span className="text-sm text-gray-600">
                  Test Date: {test.test_date} | Result Arrival: {test.result_arrival_date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Vitals</h2>
        {vitals.length === 0 ? (
          <p className="text-gray-500">No vitals recorded.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {vitals.map((vital, idx) => (
              <li key={idx}>
                Pulse: {vital.pulse}, BP: {vital.blood_pressure}, Temp: {vital.temperature}°C
                <br />
                <span className="text-sm text-gray-600">
                  Monitored at: {vital.monitoring_time}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔍 Raw JSON Data (Debug View) */}
      <div className="bg-gray-100 rounded-lg p-4 text-sm mt-10">
        <h2 className="text-md font-semibold mb-2">Raw JSON Data (Debug)</h2>
        <pre className="overflow-auto">{JSON.stringify(patientData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PatientDetails;
