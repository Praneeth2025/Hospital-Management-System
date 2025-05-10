import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import AddMedicineModal from "./AddMedicineModal";
import AddTestModal from "./AddTestModal";

const TestsAndMedicines = () => {
  const [schedules, setSchedules] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [isMedicineModalOpen, setIsMedicineModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesRes, medicinesRes, testsRes] = await Promise.all([
          axios.get("https://hopsital-management-system-backend.onrender.com/schedules/completed"),
          axios.get("https://hopsital-management-system-backend.onrender.com/medicines"),
          axios.get("https://hopsital-management-system-backend.onrender.com/tests"),
        ]);
        setSchedules(schedulesRes.data);
        setMedicines(medicinesRes.data);
        setTests(testsRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleSelection = (scheduleId) => {
    setSelectedSchedules((prev) => (prev === scheduleId ? null : scheduleId));
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const name = `${schedule.name} ${schedule.full_name}`;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedPatients = selectedSchedules
    ? filteredSchedules.filter((s) => s.patient_id === selectedSchedules)
    : [];

  const handleAddMedicineClick = () => {
    if (selectedPatients.length === 0) {
      alert("Please select at least one patient.");
      return;
    }
    setIsMedicineModalOpen(true);
  };

  const handleAddTestClick = () => {
    if (selectedPatients.length === 0) {
      alert("Please select at least one patient.");
      return;
    }
    setIsTestModalOpen(true);
  };

  return (
    <div className="p-6 w-full">
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
          className="ml-4 px-4 py-2 bg-blue-900 text-white rounded-md"
        >
          Clear
        </button>
      </div>

      {/* Table */}
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
                <th className="px-6 py-3 text-center">Select</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredSchedules.map((s) => {
                const scheduleId = s.patient_id || s.id;
                const isSelected = selectedSchedules === scheduleId;

                return (
                  <tr key={scheduleId} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{s.name}</td>
                    <td className="px-6 py-3">#{s.patient_id}</td>
                    <td className="px-6 py-3">
                      {new Date(s.schedule_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{s.gender}</td>
                    <td className="px-6 py-3">{s.age}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        {s.schedule_type}
                      </span>
                    </td>
                    <td className="px-6 py-3">{s.full_name}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => toggleSelection(scheduleId)}
                        disabled={isSelected}
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

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleAddMedicineClick}
          className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-md"
        >
          Add Medicines
        </button>
        <button
          onClick={handleAddTestClick}
          className="px-4 py-2 bg-blue-900 text-white rounded-md shadow-md"
        >
          Add Tests
        </button>
      </div>

      {/* Modals */}
      <AddMedicineModal
        isOpen={isMedicineModalOpen}
        onClose={() => setIsMedicineModalOpen(false)}
        selectedPatients={selectedPatients}
        medicines={medicines}
      />
      <AddTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        selectedPatients={selectedPatients}
        tests={tests}
      />
    </div>
  );
};

export default TestsAndMedicines;
