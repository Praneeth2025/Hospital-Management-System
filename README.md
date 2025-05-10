
# 🏥 Hospital Management System

A full-stack **Hospital Management System** web application built to streamline hospital operations and digitalize patient and medical records. The system is divided into **three core roles**: Front Desk Operator, Doctor, and Back Desk Operator, each with specific functionalities to ensure smooth workflows within a healthcare setup.

---

## 📌 Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Features](#features)

  * [Front Desk Operator](#front-desk-operator)
  * [Doctor Panel](#doctor-panel)
  * [Back Desk Operator](#back-desk-operator)
* [UI Previews](#ui-previews)
* [Setup Instructions](#setup-instructions)
* [Credentials for Verification](#credentials-for-verification)
* [Contributors](#contributors)
* [License](#license)
* [Acknowledgments](#acknowledgments)

---

## 🌟 Overview

This web application allows hospitals to efficiently manage patients, doctors, appointments, prescriptions, medicines, test reports, vitals, and more. Designed for operational clarity and responsive usage, it enhances both administrative and clinical workflows.

---

## ⚙️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, React Router
* **Backend**: Node.js, Express.js (hosted on Render)
* **Database**: PostgreSQL (Supabase)
* **HTTP Client**: Axios
* **Routing**: React Router DOM

---

## ✅ Features

### 👩‍💼 Front Desk Operator

![image](https://github.com/user-attachments/assets/e5ed58b7-1b19-42fb-a62c-e5b7346ea9ba)

The Front Desk Operator helps in managing patient appointments and facilitating smooth communication between patients and medical staff. This role involves:

* **Appointment Scheduling**: Efficiently schedules patient appointments while coordinating doctor availability.
* **Upcoming & Completed Appointments**: Views both upcoming and past appointments for tracking.
* **Patient Check-in**: Confirms and checks in patients during their visits.
* **Patient Search**: Allows searching patients by name or doctor for quick access to data.

---

### 🧑‍⚕️ Doctor Panel

![image](https://github.com/user-attachments/assets/cbd22bfd-0b52-4640-bbba-d9fb1b0de584)

The Doctor Panel is designed to streamline the work of healthcare providers. Key functionalities include:

* **Patient Management**: Accesses assigned patient details including medical history and current conditions.
* **Prescribing Medicines**: Prescribes medicines with specific dosage and timing.
* **Test Recommendations**: Suggests diagnostic tests based on symptoms and medical evaluation.
* **Medical Notes & History**: Adds notes and reviews patient history for contextual decision-making.

---

### 🖥️ Back Desk Operator

![image](https://github.com/user-attachments/assets/1c2eb1a0-703d-4db0-b38b-d48bd8ea4d6b)

The Back Desk Operator manages logistical and medical record-related operations:

* **Vitals Management**: Records vital signs like pulse, blood pressure, and temperature.
* **Medicine Management**: Logs prescribed medicines, doses, and usage timings.
* **Test Records**: Uploads and tracks test results, including date and report links.
* **Room Allocation**: Assigns hospital rooms based on treatment needs.
* **Finalizing Schedules**: Ensures all treatment and schedule data is recorded and marked complete.

---

## 💻 UI Previews

Some key user interface features include:

* **Completed Schedules Table**: Searchable by patient or doctor name; shows appointment status, doctor, and date.
* **Patient Details View**: Displays demographic info, medical records, current prescriptions, test results, vitals, and room number.

---

## 🚀 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/hospital-management-system.git
   cd hospital-management-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm start
   ```

4. **Environment Setup**

   * Ensure the backend is running or hosted.
   * Backend API Base URL: `https://hopsital-management-system-backend.onrender.com/`

---

## 🔐 Credentials for Verification

Use the following login credentials to test each role in the system:

| Role                | Username             | Password    |
| ------------------- | -------------------- | ----------- |
| Front Desk Operator | `front@gmail.com`    | `front`     |
| Doctor              | `doctor@gmail.com`   | `doctor`    |
| Back Desk Operator  | `operator@gmail.com` | `123456789` |

---

## 👥 Contributors

* [Mangipudi Vamsi Praneeth](https://github.com/Praneeth2025)
* [Pranav Tanguturu](https://github.com/PRANAVTANGUTURU123)
* [Madhasani Chandra Shekara Reddy](https://github.com/mcsr14724)
* [Kondeti Aravind](https://github.com/KondetiAravind)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

Special thanks to our mentors, peers, and the open-source community for tools and libraries that made this project possible.

