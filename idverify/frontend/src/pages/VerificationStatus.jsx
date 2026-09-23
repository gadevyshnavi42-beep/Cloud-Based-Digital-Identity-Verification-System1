import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function VerificationStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/verifications/${id}`).then((res) => setRecord(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-center">Loading...</div>;
  if (!record) return <div className="page-center">Request not found.</div>;

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Verification Status</h2>
        <div className="detail-row"><span>Request ID</span><span>{record._id}</span></div>
        <div className="detail-row"><span>Submitted</span><span>{new Date(record.submittedAt).toLocaleString()}</span></div>
        <div className="detail-row"><span>Status</span><span className="badge">{record.status}</span></div>
        {record.rejectionReason && (
          <div className="detail-row"><span>Rejection Reason</span><span>{record.rejectionReason}</span></div>
        )}
        {record.reviewedAt && (
          <div className="detail-row"><span>Reviewed</span><span>{new Date(record.reviewedAt).toLocaleString()}</span></div>
        )}

        {record.status === 'Rejected' && (
          <button className="btn btn-primary" onClick={() => navigate('/verify')}>
            Submit a New Request
          </button>
        )}
      </div>
    </div>
  );
}
