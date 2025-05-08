import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Check } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import AddAppointmentPage from "./AddAppointmentPage"; // Import the new full-page component

const ClinicListTable = () => {
  const [clinicData, setClinicData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkedRows, setCheckedRows] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await axios.get("https://hospital-management-system-backend.onrender.com/schedules/checkup");
        setClinicData(response.data);
      } catch (error) {
        console.error("Error fetching clinic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicData();
  }, []);

  const toggleCheck = (key, status) => {
    if (status !== "Inside the Cabin") {
      setCheckedRows((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleTurnIn = async () => {
    const patientIdsToUpdate = Object.keys(checkedRows).filter((id) => checkedRows[id]);

    try {
      const response = await axios.post("https://hospital-management-system-backend.onrender.com/schedules/turn-in", {
        patient_ids: patientIdsToUpdate,
      });

      if (response.status === 200) {
        const updatedData = clinicData.map((row) =>
          checkedRows[row.patient_id] ? { ...row, schedule_type: "Inside the Cabin" } : row
        );
        setClinicData(updatedData);
        setCheckedRows({});
      }
    } catch (error) {
      console.error("Turn in error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://hospital-management-system-backend.onrender.com/schedules/${selectedPatientId}`);
      setClinicData((prev) => prev.filter((row) => row.patient_id !== selectedPatientId));
      setShowDeleteModal(false);
      setSelectedPatientId(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredData = clinicData.filter((row) =>
    `${row.name} ${row.full_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAppointment = () => {
    navigate("/add-appointment"); // Use navigate to redirect to the full-page Add Appointment page
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
        <p className="text-center mt-10">Loading schedules...</p>
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
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((row) => {
                const rowKey = row.patient_id || row.id;
                const isChecked = checkedRows[rowKey] || row.schedule_type === "Inside the Cabin";

                return (
                  <tr key={rowKey} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{row.name}</td>
                    <td className="px-6 py-3">#{row.patient_id}</td>
                    <td className="px-6 py-3">{new Date(row.schedule_date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{row.gender}</td>
                    <td className="px-6 py-3">{row.age}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          row.schedule_type === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {row.schedule_type}
                      </span>
                    </td>
                    <td className="px-6 py-3">{row.full_name}</td>
                    <td className="px-6 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => toggleCheck(rowKey, row.schedule_type)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full border transition ${
                          isChecked
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-green-600 border-green-600"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => {
                          setSelectedPatientId(row.patient_id);
                          setShowDeleteModal(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="absolute bottom-6 right-6 flex gap-4">
        <button
          onClick={handleAddAppointment} // Navigate to the full-page add appointment
          className="text-white px-4 py-2 rounded-md bg-blue-900 shadow-md"
        >
          + New Appointment
        </button>
        <button
          onClick={handleTurnIn}
          className="text-white px-4 py-2 rounded-md bg-blue-900 shadow-md"
        >
          Turn In
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">This action will permanently delete the schedule.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicListTable;
