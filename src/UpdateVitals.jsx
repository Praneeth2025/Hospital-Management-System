import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import UpdateVitalsModal from "./UpdateVitalsModal";

const UpdateVitals = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatients, setSelectedPatients] = useState({});
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOccupiedRooms = async () => {
      try {
        const res = await axios.get("http://localhost:3000/rooms/occupied");
        setOccupiedRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupiedRooms();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleSelection = (patientId) => {
    setSelectedPatients((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

  const filteredPatients = occupiedRooms.filter((room) =>
    `${room.patient_name} ${room.doctor_name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const selectedPatientData = filteredPatients.filter(
    (room) => selectedPatients[room.patient_id]
  );

  return (
    <div className="p-6 w-full min-h-screen">
      {/* Search Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
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
        <p className="text-center mt-10">Loading occupied rooms...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 shadow-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Patient ID</th>
                <th className="px-6 py-3 text-left">Room ID</th>
                <th className="px-6 py-3 text-left">Admitted Time</th>
                <th className="px-6 py-3 text-center">Select</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPatients.map((room) => {
                const isSelected = selectedPatients[room.patient_id];
                return (
                  <tr key={room.room_id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{room.patient_name}</td>
                    <td className="px-6 py-3">#{room.patient_id}</td>
                    <td className="px-6 py-3">{room.room_id}</td>
                    <td className="px-6 py-3">
                      {new Date(room.assigned_time).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 flex justify-center">
                      <button
                        onClick={() => toggleSelection(room.patient_id)}
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
          onClick={() => setIsVitalsModalOpen(true)}
          className="text-white px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-800 shadow-md"
        >
          Update Vitals
        </button>
      </div>

      {/* Modal */}
      <UpdateVitalsModal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        selectedPatients={selectedPatientData}
      />
    </div>
  );
};

export default UpdateVitals;
