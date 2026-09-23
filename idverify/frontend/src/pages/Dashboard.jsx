import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const badgeClass = {
  'Pending': 'badge badge-pending',
  'Under Review': 'badge badge-review',
  'Verified': 'badge badge-verified',
  'Rejected': 'badge badge-rejected',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/verifications/my-requests'), api.get('/notifications')])
      .then(([r, n]) => {
        setRequests(r.data);
        setNotes(n.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const latestStatus = requests[0]?.status || 'Not Submitted';

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.fullName}</h2>
      <p className="muted">{user?.email}</p>

      <div className="status-row">
        <span>Current status:</span>
        <span className={badgeClass[latestStatus] || 'badge'}>{latestStatus}</span>
      </div>

      <Link to="/verify" className="btn btn-primary">Submit New Verification</Link>

      <h3>Verification History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="muted">No verification requests yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>Request ID</th><th>Document Type</th><th>Submitted</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r._id.slice(-8)}</td>
                <td>{r.documentType}</td>
                <td>{new Date(r.submittedAt).toLocaleDateString()}</td>
                <td><span className={badgeClass[r.status] || 'badge'}>{r.status}</span></td>
                <td><Link to={`/status/${r._id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Notifications</h3>
      {notes.length === 0 ? (
        <p className="muted">No notifications yet.</p>
      ) : (
        <ul className="notif-list">
          {notes.map((n) => (
            <li key={n._id}>{n.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
