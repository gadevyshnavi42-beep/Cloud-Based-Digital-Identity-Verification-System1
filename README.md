# 🔐 Cloud-Based Digital Identity Verification System

## 📌 Project Overview

The **Cloud-Based Digital Identity Verification System** is a full-stack web application designed to simplify and manage digital identity verification securely using cloud-based technologies.

The system allows users to register, log in, submit identity verification requests, upload identity documents, and track their verification status.

Administrators can review submitted requests, approve or reject applications, and manage verification records through an administrative dashboard.

The project demonstrates how web technologies, cloud storage, authentication, and database management can be integrated into a digital identity verification platform.

## 🎯 Objectives

* Provide a convenient platform for digital identity verification.
* Enable users to submit identity verification requests online.
* Allow users to track their verification status.
* Provide administrators with tools to review verification requests.
* Protect user accounts through authentication and authorization.
* Demonstrate the use of cloud technologies in identity management.

## ✨ Features

### 👤 User Features

* User registration and login.
* Secure authentication.
* Personal user dashboard.
* Identity verification form.
* Identity document upload.
* Verification request submission.
* Verification status tracking.
* Verification history.
* Notifications about verification results.

### 🛡️ Administrator Features

* Admin dashboard.
* View verification requests.
* Review submitted user information.
* Approve or reject verification requests.
* Provide rejection reasons.
* View verification statistics.
* Manage user verification records.

### ☁️ System Features

* Responsive user interface.
* REST API integration.
* MongoDB database.
* Role-based access control.
* Document upload functionality.
* Verification status management.

## 🛠️ Technologies Used

| Component                   | Technology              |
| --------------------------- | ----------------------- |
| Frontend                    | React.js                |
| UI                          | HTML5, CSS3, JavaScript |
| Frontend Development Server | Vite                    |
| Backend                     | Node.js                 |
| Backend Framework           | Express.js              |
| Database                    | MongoDB                 |
| Database Integration        | Mongoose                |
| Authentication              | JSON Web Token (JWT)    |
| Password Security           | bcrypt                  |
| API Communication           | Axios                   |
| Document Upload             | Multer                  |
| Version Control             | Git and GitHub          |

## 🏗️ System Architecture

The application follows a client-server architecture.

1. **Frontend:** React provides the user interface and communicates with the backend through REST APIs.
2. **Backend:** Node.js and Express.js handle authentication, verification requests, and administrative operations.
3. **Database:** MongoDB stores user accounts, verification records, and notifications.
4. **Document Storage:** Uploaded documents are handled through the configured document-storage mechanism.
5. **Admin Module:** Authorized administrators review verification requests and update their statuses.

## 🔄 How the System Works

1. A user registers for an account.
2. The user logs in to the application.
3. The user submits an identity verification form.
4. The user uploads the required identity document.
5. The backend validates the request and stores the verification record.
6. The verification request is assigned a pending status.
7. An administrator reviews the submitted information.
8. The administrator approves or rejects the request.
9. The system updates the verification status.
10. The user can view the result through the dashboard.

**Note:** The prototype uses an administrator-review workflow. Approval does not automatically establish that an identity document is authentic.

## 📂 Project Structure

```text
idverify/
│
├── README.md
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Notification.js
│   │   ├── User.js
│   │   └── Verification.js
│   │
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── notifications.js
│   │   ├── users.js
│   │   └── verifications.js
│   │
│   ├── uploads/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following software before running the application:

* Node.js and npm.
* MongoDB or a MongoDB Atlas database.
* Visual Studio Code.
* Git.

### Step 1: Clone the Repository

```bash
git clone https://github.com/gadevyshnavi42-beep/Cloud-Based-Digital-Identity-Verification-System1.git
```

### Step 2: Navigate to the Project

```bash
cd Cloud-Based-Digital-Identity-Verification-System1/idverify
```

If your repository already opens directly inside the `idverify` folder, skip the additional folder navigation.

### Step 3: Configure the Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Use `.env.example` as a reference and provide the required environment variables, such as your MongoDB connection string, JWT secret, and server port.

**Do not upload your actual `.env` file or secret credentials to GitHub.**

### Step 4: Start the Backend

From the `backend` directory, run:

```bash
npm start
```

If the project's `package.json` uses a different development script, use the appropriate script defined there.

### Step 5: Configure the Frontend

Open a second terminal in VS Code.

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

### Step 6: Start the Frontend

Run:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

The exact URL may differ depending on your Vite configuration.

## 🔒 Security and Privacy

The application is designed
