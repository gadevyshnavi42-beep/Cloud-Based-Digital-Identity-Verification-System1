import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function VerificationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', dateOfBirth: '', address: '', documentType: 'National ID', documentNumber: '',
  });
  const [document, setDocument] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validFileType = (file) =>
    ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!document) return setError('Please upload an identity document');
    if (!validFileType(document)) return setError('Document must be JPG, PNG, or PDF');
    if (selfie && !validFileType(selfie)) return setError('Selfie must be JPG or PNG');

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append('document', document);
    if (selfie) data.append('selfie', selfie);

    setLoading(true);
    try {
      await api.post('/verifications/submit', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => setProgress(Math.round((evt.loaded * 100) / evt.total)),
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <h2>Identity Verification</h2>
        <p className="muted">For this prototype, please use fictional or sample identity data only.</p>
        {error && <div className="error-box">{error}</div>}

        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />

        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={form.address} onChange={handleChange} required />

        <label>Identity Document Type</label>
        <select name="documentType" value={form.documentType} onChange={handleChange}>
          <option>National ID</option>
          <option>Passport</option>
          <option>Driving License</option>
        </select>

        <label>Document Number</label>
        <input name="documentNumber" value={form.documentNumber} onChange={handleChange} required />

        <label>Document Upload (JPG, PNG, or PDF)</label>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setDocument(e.target.files[0])} required />

        <label>Selfie Upload (optional)</label>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setSelfie(e.target.files[0])} />

        {loading && (
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        )}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
}
