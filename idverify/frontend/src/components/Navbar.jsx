import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">IDVerify</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && user.role === 'user' && <Link to="/dashboard">Dashboard</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user && (
          <button className="link-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
