import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDetails from "./PatientDetails"; // import the component

const OldPatients = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState(null); // new
  const [showModal, setShowModal] = useState(false); // new

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hopsital-management-system-backend.onrender.com/schedules/completed");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    `${row.name} ${row.full_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    setShowModal(true);
  };

  return (
    <div className="p-6 w-full h-screen relative">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          className="border px-4 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSearchTerm("")}
          className="text-sm text-white px-4 py-2 rounded-md bg-blue-900 shadow-md"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading completed schedules...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 shadow-md">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Patient ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Sex</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Doctor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((row) => (
                <tr
                  key={row.patient_id}
                  onClick={() => handleRowClick(row.patient_id)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-3 text-blue-700 underline">{row.name}</td>
                  <td className="px-6 py-3">#{row.patient_id}</td>
                  <td className="px-6 py-3">{new Date(row.schedule_date).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{row.gender}</td>
                  <td className="px-6 py-3">{row.age}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {row.schedule_type}
                    </span>
                  </td>
                  <td className="px-6 py-3">{row.full_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Patient Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-2xl font-bold text-gray-600 hover:text-red-600"
            >
              &times;
            </button>
            <PatientDetails patientId={selectedPatientId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OldPatients;
