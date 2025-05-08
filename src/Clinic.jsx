import React from 'react';
import { FaUserMd, FaFlask, FaList, FaHospitalAlt, FaFileInvoiceDollar, FaCog, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const patients = [
  {
    name: 'Olivia Rhye',
    handle: '@olivia',
    date: 'Dec 07, 23',
    disease: 'Diabetes',
    status: 'Complete',
    doctor: 'Dr. Mohon Roy'
  },
  {
    name: 'Phoenix Baker',
    handle: '@phoenix',
    date: 'Dec 09, 23',
    disease: 'Blood pressure',
    status: 'In-Treatment',
    doctor: 'Dr. Imran Ali'
  },
  // Add more patients as needed...
];

const StatusBadge = ({ status }) => {
  const color = status === 'Complete' ? 'green' : 'orange';
  return <span className={`text-${color}-600 font-semibold`}>{status}</span>;
};

export default function ClinicDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <div className="text-2xl font-bold mb-8">🏥 Medic</div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 text-gray-700">
            <FaUserMd /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700">
            <FaUserMd /> Doctor Appointment
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700">
            <FaFlask /> Lab Appointment
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700">
            <FaList /> Patients List
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 font-semibold bg-gray-200 p-2 rounded">
            <FaHospitalAlt /> Clinic IP
          </a>
          <details className="text-gray-700">
            <summary className="flex items-center gap-2 cursor-pointer">
              <FaFileInvoiceDollar /> Billing
            </summary>
          </details>
          <a href="#" className="flex items-center gap-2 text-gray-700">
            <FaCog /> Settings
          </a>
          <a href="#" className="flex items-center gap-2 text-red-600">
            <FaSignOutAlt /> Log Out
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center bg-indigo-900 text-white p-4 rounded mb-6">
          <div>
            <h1 className="text-lg font-semibold">Northern Central Clinic</h1>
            <p className="text-sm">Idaho, United States</p>
          </div>
          <div className="flex items-center gap-4">
            <button>🔔</button>
            <button>💬</button>
            <div className="flex flex-col items-end">
              <span className="font-semibold">Abu Fahim</span>
              <span className="text-sm">hello@8bfahim.com</span>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Patients List <span className="text-sm text-gray-500">(100 users)</span></h2>
            <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded"><FaPlus className="mr-2" />Set New Appointment</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th></th>
                <th>Patients name</th>
                <th>Patient ID</th>
                <th>Date</th>
                <th>Diseases</th>
                <th>Status</th>
                <th>Doctor name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td><input type="checkbox" /></td>
                  <td>{p.name} <span className="text-sm text-gray-400 block">{p.handle}</span></td>
                  <td>#85736733</td>
                  <td>{p.date}</td>
                  <td>{p.disease}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>{p.doctor}</td>
                  <td className="flex gap-2">
                    <button><FaEdit className="text-gray-600" /></button>
                    <button><FaTrash className="text-red-600" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center gap-1"><FaChevronLeft /> Previous</button>
            <div className="space-x-2">
              {[1, 2, 3, 8, 9, 10].map(n => (
                <button key={n} className="px-2 py-1 rounded bg-gray-200 text-sm">{n}</button>
              ))}
            </div>
            <button className="flex items-center gap-1">Next <FaChevronRight /></button>
          </div>
        </div>
      </main>
    </div>
  );
}