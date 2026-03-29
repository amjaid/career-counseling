import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar({ user, onLogout }) {
  const isAdmin = user?.role === 'admin' || user?.is_staff

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">CareerGuidance</span>
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/assessment" className="nav-link">Take Assessment</Link>
              {isAdmin && <Link to="/admin" className="nav-link admin-link">Admin</Link>}
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar