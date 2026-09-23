import { useEffect, useState } from 'react';
import api from '../services/api';

const badgeClass = {
  'Pending': 'badge badge-pending',
  'Under Review': 'badge badge-review',
  'Verified': 'badge badge-verified',
  'Rejected': 'badge badge-rejected',
};

export default function AdminVerifications() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState('');
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' | 'reject'

  const load = () => {
    api.get('/admin/verifications', { params: { search, status } }).then((res) => setRecords(res.data));
  };

  useEffect(() => { load(); }, [search, status]); // eslint-disable-line

  const openRecord = async (id) => {
    const res = await api.get(`/admin/verifications/${id}`);
    setSelected(res.data);
    setReason('');
    setConfirmAction(null);
  };

  const runAction = async () => {
    if (!selected) return;
    if (confirmAction === 'approve') {
      await api.put(`/admin/verifications/${selected._id}/approve`);
    } else if (confirmAction === 'reject') {
      if (!reason) return;
      await api.put(`/admin/verifications/${selected._id}/reject`, { reason });
    }
    setConfirmAction(null);
    setSelected(null);
    load();
  };

  return (
    <div className="dashboard">
      <h2>Verification Management</h2>

      <div className="filters">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Type</th><th>Submitted</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.fullName}</td>
              <td>{r.userId?.email}</td>
              <td>{r.documentType}</td>
              <td>{new Date(r.submittedAt).toLocaleDateString()}</td>
              <td><span className={badgeClass[r.status] || 'badge'}>{r.status}</span></td>
              <td><button className="link-btn" onClick={() => openRecord(r._id)}>Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Review Request</h3>
            <div className="detail-row"><span>Name</span><span>{selected.fullName}</span></div>
            <div className="detail-row"><span>DOB</span><span>{new Date(selected.dateOfBirth).toLocaleDateString()}</span></div>
            <div className="detail-row"><span>Address</span><span>{selected.address}</span></div>
            <div className="detail-row"><span>Document Type</span><span>{selected.documentType}</span></div>
            <div className="detail-row"><span>Document Number</span><span>{selected.documentNumber}</span></div>
            <div className="detail-row">
              <span>Document</span>
              <a href={`/api/admin/verifications/${selected._id}/document/document`} target="_blank" rel="noreferrer">Preview</a>
            </div>
            {selected.selfieFileReference && (
              <div className="detail-row">
                <span>Selfie</span>
                <a href={`/api/admin/verifications/${selected._id}/document/selfie`} target="_blank" rel="noreferrer">Preview</a>
              </div>
            )}

            {!confirmAction && (
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={() => setConfirmAction('approve')}>Approve</button>
                <button className="btn btn-outline" onClick={() => setConfirmAction('reject')}>Reject</button>
                <button className="link-btn" onClick={() => setSelected(null)}>Close</button>
              </div>
            )}

            {confirmAction === 'reject' && (
              <div className="reject-box">
                <label>Rejection Reason</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={runAction} disabled={!reason}>Confirm Reject</button>
                  <button className="link-btn" onClick={() => setConfirmAction(null)}>Cancel</button>
                </div>
              </div>
            )}

            {confirmAction === 'approve' && (
              <div className="modal-actions">
                <p>Are you sure you want to approve this request?</p>
                <button className="btn btn-primary" onClick={runAction}>Yes, Approve</button>
                <button className="link-btn" onClick={() => setConfirmAction(null)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
