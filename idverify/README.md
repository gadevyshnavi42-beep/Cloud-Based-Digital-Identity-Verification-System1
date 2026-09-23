# Cloud-Based Digital Identity Verification System

A simplified full-stack prototype: users submit identity verification
requests with document uploads; admins review and approve/reject them.

**This is a demo/student project.** It does not perform real government ID
authentication — approval is a manual admin decision. Use only fictional or
sample document data.

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, plain CSS
- **Backend:** Node.js, Express, JWT auth, bcrypt, Multer (local file storage)
- **Database:** MongoDB with Mongoose

## Project Structure

```
idverify/
├── backend/
│   ├── config/db.js
│   ├── models/          User, Verification, Notification
│   ├── middleware/       auth.js, admin.js, upload.js
│   ├── routes/           auth, users, verifications, admin, notifications
│   ├── uploads/          uploaded documents (created at runtime)
│   ├── seed.js           creates a demo admin + demo user
│   ├── server.js
│   └── .env.example
└── frontend/
    └── src/
        ├── pages/         Home, Login, Register, Dashboard,
        │                  VerificationForm, VerificationStatus,
        │                  AdminDashboard, AdminVerifications
        ├── components/    Navbar, PrivateRoute
        ├── context/       AuthContext
        └── services/      api.js (axios instance)
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local install, or a free MongoDB Atlas cluster)

## Setup & Run (in VS Code terminal)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your MongoDB connection string
# and set JWT_SECRET to a long random string
node seed.js      # creates a demo admin + demo user (optional but recommended)
npm run dev        # starts the API on http://localhost:5000
```

Demo accounts created by `seed.js`:
- Admin: `admin@idverify.test` / `Admin@123`
- User:  `demo@idverify.test` / `Demo@123`

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev         # starts the app on http://localhost:5173
```

Visit `http://localhost:5173` in your browser. The Vite dev server proxies
`/api` requests to the backend on port 5000.

## What's included

- Registration / login with hashed passwords (bcrypt) and JWT tokens
- Role-based access (`user` / `admin`) enforced on protected routes
- Identity verification form with file upload (JPG/PNG/PDF, 5MB limit)
- User dashboard: status badge, verification history, notifications
- Admin dashboard: stats + a searchable/filterable verification queue
- Approve / reject workflow with a required rejection reason and a
  confirmation step before the status changes
- Document preview served only through an authenticated admin route
  (not a public URL)
- Basic rate limiting on auth endpoints, CORS, and security headers

## What was simplified from the full spec

To keep this a "simple" runnable project, a few things from the original
spec were scoped down — happy to extend any of these on request:

- Documents are stored on local disk under `backend/uploads/` rather than
  Cloudinary/AWS S3 (swap in `middleware/upload.js` if you want cloud storage)
- `documentNumber` is stored as plain text with a code comment noting where
  field-level encryption should be added for production use
- No password-reset email flow ("Forgot Password" is a placeholder link)
- No automated test suite — see the "Manual test checklist" below instead

## Manual test checklist

- Register a new user, then try registering the same email again (should fail)
- Log in with wrong password (should fail with a generic error)
- Log in as `demo@idverify.test`, submit a verification with a PDF and a PNG
- Try uploading a `.txt` file as the document (should be rejected)
- Log in as `admin@idverify.test`, view the request, approve it
- Log in as the demo user again — dashboard should show "Verified" and a
  notification
- Submit another request as the demo user, reject it as admin with a reason,
  confirm the user sees the rejection reason and a "Submit a New Request" option
- Try requesting `GET /api/verifications/:id` for another user's request
  with your own token (should be `403 Forbidden`)
