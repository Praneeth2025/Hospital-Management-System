import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./oldPatientsStyles.css"; // Make sure to import the CSS

const OldPatients = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/schedules/completed");
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
    (`${row.name} ${row.full_name}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wizard-zone">
      <div className="taco-tools">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          className="input-sprinkle"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")} className="bouncy-cube">
          Clear
        </button>
      </div>

      {loading ? (
        <p className="glow-blink">Loading completed schedules...</p>
      ) : (
        <div className="scroller-bug">
          <table className="wonky-board">
            <thead className="space-cadet">
              <tr>
                <th className="spine-cell">Name</th>
                <th className="spine-cell">Patient ID</th>
                <th className="spine-cell">Date</th>
                <th className="spine-cell">Sex</th>
                <th className="spine-cell">Age</th>
                <th className="spine-cell">Status</th>
                <th className="spine-cell">Doctor</th>
              </tr>
            </thead>
            <tbody className="pillow-grid">
              {filteredData.map((row) => (
                <tr key={row.patient_id} className="hoverish">
                  <td className="spine-cell">
                    <Link to={`/patient-details/${row.patient_id}`} className="link-worm">
                      {row.name}
                    </Link>
                  </td>
                  <td className="spine-cell">#{row.patient_id}</td>
                  <td className="spine-cell">{new Date(row.schedule_date).toLocaleDateString()}</td>
                  <td className="spine-cell">{row.gender}</td>
                  <td className="spine-cell">{row.age}</td>
                  <td className="spine-cell">
                    <span className="status-pebble">{row.schedule_type}</span>
                  </td>
                  <td className="spine-cell">{row.full_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OldPatients;
