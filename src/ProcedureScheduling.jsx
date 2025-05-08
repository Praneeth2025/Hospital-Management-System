import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import PendingTestModal from "./PendingTestModal";

const TestUpdate = () => {
  const [testPatients, setTestPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatients, setSelectedPatients] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://hospital-management-system-backend.onrender.com/tests/patients");
        setTestPatients(res.data);
      } catch (err) {
        console.error("Error fetching test patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleSelection = (patientId) => {
    setSelectedPatients((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

  // Deduplicate patients (multiple tests possible per patient)
  const uniquePatients = Object.values(
    testPatients.reduce((acc, p) => {
      if (!acc[p.patient_id]) acc[p.patient_id] = p;
      return acc;
    }, {})
  );

  const filteredPatients = uniquePatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatientList = filteredPatients.filter(
    (patient) => selectedPatients[patient.patient_id]
  );

  return (
    <div className="p-6 w-full min-h-screen">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by patient..."
          className="border px-4 py-2 rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => setSearchTerm("")}
          className="ml-4 text-sm text-white px-4 py-2 rounded-md bg-blue-900 shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center mt-10">Loading test patients...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 shadow-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Patient ID</th>
                <th className="px-6 py-3 text-left">Sex</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-center">Select</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPatients.map((patient) => {
                const isSelected = selectedPatients[patient.patient_id];
                return (
                  <tr key={patient.patient_id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{patient.name}</td>
                    <td className="px-6 py-3">#{patient.patient_id}</td>
                    <td className="px-6 py-3">{patient.gender}</td>
                    <td className="px-6 py-3">{patient.age}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => toggleSelection(patient.patient_id)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full border transition ${
                          isSelected
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-green-600 border-green-600"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="text-white px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-800 shadow-md"
        >
          Update Test Results
        </button>
      </div>

      {/* Modal */}
      <PendingTestModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        selectedPatients={selectedPatientList.map((p) => ({
          patient_id: p.patient_id,
          doctor_email: p.doctor_email,
        }))}
      />
    </div>
  );
};

export default TestUpdate;
