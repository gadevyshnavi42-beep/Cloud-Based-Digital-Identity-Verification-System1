import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', mobileNumber: '', password: '', confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) return setError('You must accept the Terms and Conditions');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');

    setLoading(true);
    try {
      const user = await register({
        fullName: form.fullName,
        email: form.email,
        mobileNumber: form.mobileNumber,
        password: form.password,
      });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <div className="error-box">{error}</div>}

        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />

        <label>Email Address</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Mobile Number</label>
        <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

        <label className="checkbox-row">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I agree to the Terms and Conditions
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="form-footer">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
