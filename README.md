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
* [Setup Instructions](#setup-instructions)
* [Contributors](#contributors)
* [License](#license)

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

* **Appointment Scheduling** : The front desk operator is responsible for efficiently scheduling patient appointments, ensuring that doctors' and patients' schedules align.

* **Upcoming & Completed Appointments** : They can easily view both upcoming and completed appointments, helping them track the flow of patients and ensure no appointments are missed.

* **Patient Check-in:** On the day of the appointment, the front desk operator manages the patient check-in process, confirming details, and ensuring that all necessary documents are provided.

* **Patient Search:** The operator can search for patients by name or doctor, helping to quickly retrieve relevant information when needed.
---

### 🧑‍⚕️ Doctor Panel
![image](https://github.com/user-attachments/assets/cbd22bfd-0b52-4640-bbba-d9fb1b0de584)

* **The Doctor Panel is designed to streamline the work of healthcare providers, helping them manage patient care with ease and efficiency. Features include:

* **Patient Management:** Doctors can view their assigned patients, including details about medical history, current conditions, and scheduled treatments.

* **Prescribing Medicines:** Doctors can prescribe medicines, specifying dosage and timing, to ensure that patients receive the right medications in the correct amounts.
---


### 🖥️ Back Desk Operator
![image](https://github.com/user-attachments/assets/1c2eb1a0-703d-4db0-b38b-d48bd8ea4d6b)


The Back Desk Operator manages the administrative and logistical aspects of patient care. This role ensures that all medical data is recorded, monitored, and properly managed. Key responsibilities include:

* **Vitals Management:** The back desk operator tracks and manages vital signs such as pulse, blood pressure, and temperature, ensuring that these measurements are properly recorded for each patient.

* **Medicine Management:** They oversee the addition of prescribed medicines to the system, keeping track of medications given to patients, along with their dosage and timing.

* **Test Records:** The operator adds and manages test results, including uploading test results with dates and direct links to results, ensuring that they are accessible for doctors and patients.

* **Room Allocation:** The back desk operator assigns rooms to patients, ensuring they are placed in appropriate locations based on their treatment and needs.

* **Finalizing Patient Schedules:** The operator is responsible for completing patient schedules and managing all necessary administrative work to finalize treatment and appointments.

---

## 💻 UI Previews

Here’s a glimpse of some key components:

* **Completed Schedules Table**: Searchable by patient or doctor name, shows status, doctor name, and schedule date.
* **Patient Details View**: Displays demographics, current diagnosis, prescribed medicine, test results, vitals, and doctor assignment.

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

4. **Environment**

   * Make sure the backend is hosted or run locally.
   * Backend API Base URL: `https://hopsital-management-system-backend.onrender.com/`

---

## 👥 Contributors

* [Mangipudi Vamsi Praneeth](https://github.com/Praneeth2025)
* [Pranav Tanguturu](https://github.com/PRANAVTANGUTURU123)
* [Madhasani Chandra Shekara Reddy](https://github.com/mcsr14724)
* [Kondeti Aravind](https://github.com/mcsr14724)


---

## 📄 License

---

## 🙌 Acknowledgments

Thanks to all team members and mentors who helped in the development and design of this system. Special shoutout to the open-source community for React and Node.js tools.

---
