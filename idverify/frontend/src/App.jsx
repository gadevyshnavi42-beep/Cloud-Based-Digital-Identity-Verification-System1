import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerificationForm from './pages/VerificationForm';
import VerificationStatus from './pages/VerificationStatus';
import AdminDashboard from './pages/AdminDashboard';
import AdminVerifications from './pages/AdminVerifications';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/verify" element={<PrivateRoute><VerificationForm /></PrivateRoute>} />
          <Route path="/status/:id" element={<PrivateRoute><VerificationStatus /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/verifications" element={<PrivateRoute adminOnly><AdminVerifications /></PrivateRoute>} />
        </Routes>
      </main>
    </>
  );
}
