import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const themeColor = "#181c3a";
const accentColor = "#3B44B2";

const MyProfile = () => {
  const doctorId = 1; // 🔥 Hardcoded here

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch('https://hopsital-management-system-backend.onrender.com/doctors');
        const data = await res.json();
        const found = data.find(d => d.id === doctorId);
        if (!found) {
          setError('Doctor not found');
        } else {
          setDoctor(found);
        }
      } catch (err) {
        setError('Failed to fetch doctor data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!doctor) return <div>No profile found</div>;

  return (
    <div style={{
      maxWidth: 800,
      minHeight: 420,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 8px 32px rgba(16,24,40,0.10)',
      padding: 40,
      fontFamily: 'Instrument Sans, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, marginBottom: 24 }}>
        <img
          src={doctor.image_link || 'https://randomuser.me/api/portraits/men/1.jpg'}
          alt={doctor.full_name}
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `4px solid ${accentColor}`,
            boxShadow: '0 2px 12px rgba(59,68,178,0.10)'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: themeColor }}>
            {doctor.full_name} <span style={{ fontSize: 19, fontWeight: 400, color: accentColor }}>({doctor.gender})</span>
          </div>
          <div style={{ color: accentColor, fontSize: 19, marginTop: 6, fontWeight: 500 }}>
            {doctor.specialization} | {doctor.qualification}
          </div>
          <div style={{ color: '#444', marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaMapMarkerAlt style={{ marginRight: 8, color: accentColor }} /> Room {doctor.room_no}
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaEnvelope style={{ marginRight: 8, color: accentColor }} /> {doctor.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaPhone style={{ marginRight: 8, color: accentColor }} /> {doctor.contact_no}
            </span>
          </div>
        </div>
      </div>

      <div style={{
        background: "#f4f6fa",
        borderRadius: 12,
        padding: "20px 28px",
        marginBottom: 12
      }}>
        <div style={{ color: accentColor, fontSize: 18, marginBottom: 14, fontWeight: 600 }}>Professional Details</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16 }}>
          <div>Years of Experience: <b style={{ color: themeColor }}>{doctor.years_experience}</b></div>
          <div>Working Days: <b style={{ color: themeColor }}>{doctor.working_days}</b></div>
          <div>OP Timings: <b style={{ color: themeColor }}>{doctor.op_timings}</b></div>
          <div>Medical Registration No: <b style={{ color: themeColor }}>{doctor.medical_reg_no}</b></div>
        </div>
      </div>

      <div>
        <div style={{ color: accentColor, fontSize: 18, marginBottom: 8, fontWeight: 600 }}>About</div>
        <div style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>
          {doctor.description}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
