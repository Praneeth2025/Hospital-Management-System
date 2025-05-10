import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import AddRoomModal from "./AddRoomModal";

const RoomsAndSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesRes, roomsRes] = await Promise.all([
          axios.get("https://hopsital-management-system-backend.onrender.com/schedules/completed"),
          axios.get("https://hopsital-management-system-backend.onrender.com/rooms"),
        ]);
        setSchedules(schedulesRes.data);
        setRooms(roomsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleSelection = (scheduleId) => {
    setSelectedSchedule((prev) => (prev === scheduleId ? null : scheduleId));
  };

  const filteredSchedules = schedules.filter((schedule) =>
    `${schedule.name} ${schedule.full_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = filteredSchedules.find(
    (schedule) => schedule.patient_id === selectedSchedule
  );

  const handleDischarge = async () => {
    if (!selectedPatient) return alert("Select exactly one patient to discharge.");

    const room = rooms.find((r) => r.patient_id === selectedPatient.patient_id);
    if (!room) return alert("No room assigned to this patient.");

    try {
      await axios.post("https://hopsital-management-system-backend.onrender.com/rooms/discharge", {
        room_id: room.room_id,
        patient_id: selectedPatient.patient_id,
      });

      alert("Patient discharged and room marked as Vacant.");
      setRooms((prev) =>
        prev.map((r) =>
          r.room_id === room.room_id ? { ...r, status: "Vacant", patient_id: null } : r
        )
      );
      setSelectedSchedule(null);
    } catch (err) {
      console.error("Discharge failed:", err);
      alert("Failed to discharge patient.");
    }
  };

  return (
    <div className="p-6 w-full min-h-screen relative">
      {/* Search */}
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
        <p className="text-center mt-10">Loading completed schedules...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 shadow-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Patient ID</th>
                <th className="px-6 py-3 text-left">Room</th>
                <th className="px-6 py-3 text-left">Sex</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-center">Select</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredSchedules.map((schedule) => {
                const scheduleId = schedule.patient_id || schedule.id;
                const isSelected = selectedSchedule === scheduleId;
                const room = rooms.find((r) => r.patient_id === schedule.patient_id);
                const assignedStatus = room ? "Assigned" : "Not Assigned";

                return (
                  <tr key={scheduleId} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{schedule.name}</td>
                    <td className="px-6 py-3">#{schedule.patient_id}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          assignedStatus === "Assigned"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {assignedStatus}
                      </span>
                    </td>
                    <td className="px-6 py-3">{schedule.gender}</td>
                    <td className="px-6 py-3">{schedule.age}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {schedule.schedule_type}
                      </span>
                    </td>
                    <td className="px-6 py-3">{schedule.full_name}</td>
                    <td className="px-6 py-3 flex justify-center">
                      <button
                        onClick={() => toggleSelection(scheduleId)}
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

      {/* Action Buttons */}
      <div className="absolute bottom-6 right-6 flex gap-4">
        <button
          onClick={() => setIsRoomModalOpen(true)}
          className="text-white px-4 py-2 rounded-md bg-blue-900 shadow-md"
        >
          Assign Room
        </button>
        <button
          onClick={handleDischarge}
          className="text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 shadow-md"
        >
          Discharge
        </button>
      </div>

      {/* Modal */}
      <AddRoomModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        selectedPatients={selectedPatient ? [selectedPatient] : []}
        rooms={rooms}
      />
    </div>
  );
};

export default RoomsAndSchedules;
