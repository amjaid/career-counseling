import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { API_ENDPOINTS } from '../config/api'
import './Pages.css'

function Dashboard({ user }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch(API_ENDPOINTS.ASSESSMENTS.HISTORY, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Welcome, {user.username}! 👋</h1>
          <p>Ready to discover your ideal career path?</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div 
            className="dashboard-card start-assessment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card-icon">🎯</div>
            <h2>Take Assessment</h2>
            <p>Complete our career assessment to get personalized recommendations based on your interests, skills, and values.</p>
            <Link to="/assessment" className="btn-card">Start Assessment</Link>
          </motion.div>

          <motion.div 
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-icon">📊</div>
            <h2>Your Results</h2>
            {loading ? (
              <p>Loading...</p>
            ) : results.length > 0 ? (
              <div className="results-list">
                {results.slice(0, 3).map((result, index) => (
                  <Link key={index} to={`/results/${result.id}`} className="result-item">
                    <span className="result-date">{new Date(result.completed_at).toLocaleDateString()}</span>
                    <span className="result-top-career">
                      {result.recommended_careers?.[0]?.name || 'View Results'}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No assessments yet. Take your first assessment!</p>
            )}
          </motion.div>

          <motion.div 
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-icon">💡</div>
            <h2>Tips</h2>
            <ul className="tips-list">
              <li>Be honest with your answers</li>
              <li>Take your time - there's no timer</li>
              <li>Review your results carefully</li>
              <li>Explore multiple career options</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard