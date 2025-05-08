import React, { useEffect, useState } from "react";
import "./AddRoomModal.css"; // Your updated CSS file for styling
import axios from "axios";

const AddRoomModal = ({ isOpen, onClose, selectedPatients }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios.get("https://hospital-management-system-backend.onrender.com/rooms").then((res) => {
        setRooms(res.data);
      });
    }
  }, [isOpen]);

  const getRoomStyle = (room) => {
    if (room.status === "Occupied") return "room-box occupied";
    if (selectedRoomId === room.room_id) return "room-box selected";
    return room.room_type === "AC" ? "room-box ac" : "room-box non-ac";
  };

  const handleRoomClick = (room) => {
    if (room.status === "Occupied") return;
    setSelectedRoomId(room.room_id);
  };

  const handleAssign = async () => {
    if (!selectedRoomId || selectedPatients.length === 0) return alert("Select room and patient");

    try {
      const res = await axios.post("https://hospital-management-system-backend.onrender.com/rooms/assign", {
        room_id: selectedRoomId,
        patient_id: selectedPatients[0].patient_id,
      });
      alert("Room assigned successfully");
      onClose();
    } catch (err) {
      console.error("Error assigning room:", err);
      alert("Failed to assign room");
    }
  };

  if (!isOpen) return null;

  // Separate rooms into AC and non-AC
  const acRooms = rooms.filter(room => room.room_type === "AC");
  const nonAcRooms = rooms.filter(room => room.room_type !== "AC");

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Assign Room</h2>
        <p className="patient-name">Patient: {selectedPatients[0]?.name}</p>

        {/* Non-AC Rooms */}
        <div className="room-grid">
          {/* All rooms in a single row */}
          <div className="room-row-all">
            {nonAcRooms.slice(0, 10).map((room) => (
              <div
                key={room.room_id}
                className={getRoomStyle(room)}
                onClick={() => handleRoomClick(room)}
              >
                {room.room_id}
              </div>
            ))}
          </div>
        </div>

        {/* AC Rooms */}
        <div className="room-grid">
          {/* All rooms in a single row */}
          <div className="room-row-all">
            {acRooms.slice(0, 10).map((room) => (
              <div
                key={room.room_id}
                className={getRoomStyle(room)}
                onClick={() => handleRoomClick(room)}
              >
                {room.room_id}
              </div>
            ))}
          </div>
        </div>

        <button className="assign-button" onClick={handleAssign}>
          Assign Room
        </button>
      </div>
    </div>
  );
};

export default AddRoomModal;
