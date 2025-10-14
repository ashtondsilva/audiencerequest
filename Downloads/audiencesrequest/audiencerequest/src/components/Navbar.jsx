// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Audience Request</Link>
      <Link to="/tracking" style={styles.link}>Tracking Dashboard</Link>
      <Link to="/admin" style={styles.link}>Client Admin</Link>
      <Link to="/audit-trail" style={styles.link}>Audit Trail</Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    gap: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
