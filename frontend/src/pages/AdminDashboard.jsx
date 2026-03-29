import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { API_ENDPOINTS } from '../config/api'
import './AdminDashboard.css'
import './Pages.css'

function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    
    // Fetch stats
    fetch(API_ENDPOINTS.ADMIN.STATS, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : {})
      .then(data => setStats(data))
      .catch(() => setStats({}))
      
    // Fetch all results
    fetch(API_ENDPOINTS.ASSESSMENTS.HISTORY, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [])

  const isAdmin = user?.role === 'admin' || user?.is_staff

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h1>🔒 Access Denied</h1>
        <p>You don't have admin privileges to view this page.</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>🛠️ Admin Dashboard</h1>
            <div className="admin-actions">
              <Link to="/dashboard" className="btn-admin">Student View</Link>
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="admin-loading">Loading admin data...</div>
        ) : (
          <>
            <motion.div 
              className="stats-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <div className="stat-info">
                  <h3>{stats?.total_students || 0}</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📝</span>
                <div className="stat-info">
                  <h3>{stats?.total_assessments || 0}</h3>
                  <p>Total Assessments</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🎯</span>
                <div className="stat-info">
                  <h3>{results.length || 0}</h3>
                  <p>Results Recorded</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📊</span>
                <div className="stat-info">
                  <h3>{Object.keys(stats?.career_distribution || {}).length || 0}</h3>
                  <p>Career Categories</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="career-distribution"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2>Career Distribution</h2>
              {stats?.career_distribution && Object.keys(stats.career_distribution).length > 0 ? (
                <div className="distribution-chart">
                  {Object.entries(stats.career_distribution).map(([career, count], index) => (
                    <div key={career} className="distribution-item">
                      <span className="career-name">{career}</span>
                      <div className="distribution-bar">
                        <motion.div 
                          className="bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / stats.total_assessments) * 100}%` }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                      <span className="career-count">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No assessment data yet</p>
              )}
            </motion.div>

            <motion.div 
              className="recent-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Recent Assessment Results</h2>
              {results.length > 0 ? (
                <div className="results-table">
                  <div className="table-header">
                    <span>Student</span>
                    <span>Date</span>
                    <span>Top Recommendation</span>
                    <span>Match %</span>
                  </div>
                  {results.slice(0, 10).map((result, index) => (
                    <div key={index} className="table-row">
                      <span className="student-name">{result.student_username || result.student}</span>
                      <span className="result-date">{new Date(result.completed_at).toLocaleDateString()}</span>
                      <span className="top-career">{result.recommended_careers?.[0]?.name || 'N/A'}</span>
                      <span className="match-percent">{result.recommended_careers?.[0]?.match_score || 0}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No results yet</p>
              )}
            </motion.div>

            <motion.div 
              className="admin-links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Quick Actions</h2>
              <div className="links-grid">
                <a href={API_ENDPOINTS.ADMIN_URL} target="_blank" rel="noopener noreferrer" className="admin-link-card">
                  <span>🔧</span>
                  <h3>Django Admin</h3>
                  <p>Manage questions, careers, users</p>
                </a>
                <Link to="/assessment" className="admin-link-card">
                  <span>📝</span>
                  <h3>Take Assessment</h3>
                  <p>Test the quiz as admin</p>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard