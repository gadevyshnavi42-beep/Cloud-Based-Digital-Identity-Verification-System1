import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div className="page-center">Loading...</div>;

  const cards = [
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Total Requests', value: stats.totalRequests },
    { label: 'Pending', value: stats.pending },
    { label: 'Approved', value: stats.approved },
    { label: 'Rejected', value: stats.rejected },
  ];

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stat-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>
      <Link to="/admin/verifications" className="btn btn-primary">Manage Verifications</Link>
    </div>
  );
}
