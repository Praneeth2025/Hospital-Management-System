import React, { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import MyProfile from "./MyProfile";  // Import the MyProfile component
import './DoctorCard.css';

const DoctorsPage = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for selected doctor

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/doctors");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched doctors:", data);
        setAllDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = allDoctors.filter((doc) =>
    doc.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor); // Set selected doctor when button is clicked
  };

  const handleGoBack = () => {
    setSelectedDoctor(null); // Reset selected doctor when back button is clicked
  };

  return (
    <div className="doctors-page">
      {selectedDoctor ? (
        // Show the profile view if a doctor is selected
        <div>
          <button
  onClick={handleGoBack}
  style={{
    backgroundColor: "#3B44B2", // Accent color
    color: "#fff",              // White text
    border: "none",             // Remove default border
    padding: "10px 20px",       // Add padding
    borderRadius: "5px",        // Rounded corners
    cursor: "pointer",          // Pointer cursor on hover
    fontSize: "16px",            // Font size
    fontWeight: "600",           // Bold text
    transition: "background-color 0.3s ease", // Smooth transition on hover
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = "#2a35a1"} // Darker color on hover
  onMouseOut={(e) => e.target.style.backgroundColor = "#3B44B2"} // Reset to original color
>
  Back to Doctor List
</button>
          <MyProfile doctor={selectedDoctor} />
        </div>
      ) : (
        // Show the doctors list if no doctor is selected
        <div>
          <div className="doctors-header">
            <h2>Our Doctors</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search doctors..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn" onClick={() => setSearchTerm("")}>
                Clear
              </button>
            </div>
          </div>

          <div className="doctors-list">
            {loading ? (
              <p>Loading doctors...</p>
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div className="doctor-card-wrapper" key={doc.id}>
                  <DoctorCard doctor={doc} onViewDetails={() => handleViewDetails(doc)} />
                </div>
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
