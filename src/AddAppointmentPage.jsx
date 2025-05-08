import React, { useState, useEffect } from "react";
import './AddMedicineModal.css'
const initialState = {
  name: "",
  age: "",
  gender: "",
  mobile_number: "",
  email_id: "",
  address: "",
  guardian_name: "",
  guardian_mobile_number: "",
  problem_description: "",
  allergies: "",
  current_medicines: "",
  specialist: "",
  doctor_name: "",
  doctor_id: "",
  selected_date: "",
  selected_time: "",
};

function Appointment() {
  const [form, setForm] = useState(initialState);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctor_id") {
      const selectedDoc = doctors.find((doc) => doc.id === value);
      setForm((prev) => ({
        ...prev,
        doctor_id: value,
        doctor_name: selectedDoc ? selectedDoc.full_name : "",
      }));
      console.log("Selected Doctor:", selectedDoc?.full_name);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://hospital-management-system-backend.onrender.com/api/doctors", {
          headers: { "Cache-Control": "no-cache" },
        });

        if (!res.ok) throw new Error("Failed to fetch doctors");

        const data = await res.json();
        setDoctors(data);
        setFilteredDoctors(data);
        console.table(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
        setFilteredDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (form.specialist && doctors.length > 0) {
      const filtered = doctors.filter(
        (doctor) => doctor.specialization === form.specialist
      );
      setFilteredDoctors(filtered);
      console.log("Doctors for selected specialization:");
      filtered.forEach((doc) => console.log(doc.full_name));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [form.specialist, doctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://hospital-management-system-backend.onrender.com/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Appointment created successfully!");
        setForm(initialState);
        setFilteredDoctors([]);
      } else {
        alert(data.error || "Failed to submit appointment");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="tel"
            name="mobile_number"
            placeholder="Mobile Number"
            value={form.mobile_number}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="email"
          name="email_id"
          placeholder="Email ID"
          value={form.email_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="guardian_name"
          placeholder="Guardian Name"
          value={form.guardian_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="guardian_mobile_number"
          placeholder="Guardian Mobile Number"
          value={form.guardian_mobile_number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="problem_description"
          placeholder="Describe your problem"
          value={form.problem_description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <textarea
          name="allergies"
          placeholder="Any allergies?"
          value={form.allergies}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <textarea
          name="current_medicines"
          placeholder="Current medications"
          value={form.current_medicines}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <select
          name="specialist"
          value={form.specialist}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Specialist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">ENT</option>
          <option value="Pediatrician">Gastroenterologist</option>
          <option value="Orthopedic">Neurologist</option>
        </select>

        {loading && <p className="text-gray-600">Loading doctors...</p>}

        <select
          name="doctor_id"
          value={form.doctor_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Doctor</option>
          {filteredDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.full_name}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <input
            type="date"
            name="selected_date"
            value={form.selected_date}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="time"
            name="selected_time"
            value={form.selected_time}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
}

export default Appointment;
