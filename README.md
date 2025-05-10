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
* [API Endpoints](#api-endpoints)
* [Contributors](#contributors)
* [License](#license)

---

## 🌟 Overview

This web application allows hospitals to efficiently manage patients, doctors, appointments, prescriptions, medicines, test reports, vitals, and more. Designed for operational clarity and responsive usage, it enhances both administrative and clinical workflows.

---

## ⚙️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, React Router
* **Backend**: Node.js, Express.js (hosted on Render)
* **Database**: MongoDB (assumed)
* **HTTP Client**: Axios
* **Routing**: React Router DOM

---

## ✅ Features

### 👩‍💼 Front Desk Operator

* Handles appointment scheduling
* Views upcoming and completed appointments
* Manages patient check-in
* Search patients by name or doctor

### 🧑‍⚕️ Doctor Panel

* Views their assigned patients
* Prescribes medicines with dosage and timing
* Recommends tests
* Adds medical notes
* Views patient history

### 🖥️ Back Desk Operator

* Adds and manages:

  * Vitals (pulse, temperature, blood pressure)
  * Prescribed medicines
  * Test records (with result links and dates)
  * Patient room numbers
* Finalizes and completes patient schedules

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

## 🔌 API Endpoints Used

### Completed Schedules (Front Desk)

```
GET /schedules/completed
```

### Patient Details (Doctor/Back Desk)

```
GET /api/patients/:patientId
```

These APIs return structured JSON including:

* Patient demographics
* Medical history
* Prescribed medicine and dosage
* Test details with result links
* Vital signs and monitoring time

---

## 👥 Contributors

* [Your Name](https://github.com/your-username)
* [Collaborator's Name](https://github.com/collaborator-username)

> Add your collaborators using GitHub's **Settings > Collaborators** feature

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, distribute, and modify it under the terms of the license.

---

## 🙌 Acknowledgments

Thanks to all team members and mentors who helped in the development and design of this system. Special shoutout to the open-source community for React and Node.js tools.

---
