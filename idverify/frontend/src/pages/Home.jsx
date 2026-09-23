import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Cloud-Based Digital Identity Verification</h1>
        <p>Submit your identity documents securely and track your verification status in real time.</p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>Secure Uploads</h3>
          <p>Documents are stored privately and previewed only through authorized links.</p>
        </div>
        <div className="card">
          <h3>Fast Review</h3>
          <p>Administrators review submissions and update your status promptly.</p>
        </div>
        <div className="card">
          <h3>Full Transparency</h3>
          <p>Track every request from submission to decision on your dashboard.</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Register and log in to your account.</li>
          <li>Fill in the verification form and upload your ID document.</li>
          <li>An administrator reviews your submission.</li>
          <li>You receive a notification once it's approved or rejected.</li>
        </ol>
      </section>

      <section className="security-note">
        <h2>Security &amp; Privacy</h2>
        <p>
          This is a demonstration prototype. It does not automatically authenticate
          government-issued documents — approval is performed manually by an administrator.
          Please only use sample or fictional data.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} IDVerify — Student Project Prototype</p>
      </footer>
    </div>
  );
}
