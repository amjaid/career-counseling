import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { API_ENDPOINTS } from '../config/api'
import './Pages.css'

function Results({ user }) {
  const { id } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch(API_ENDPOINTS.ASSESSMENTS.DETAIL(id), {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setResult(data))
      .catch(() => setResult(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="results-loading">Loading results...</div>
  if (!result) return <div className="results-loading">Result not found</div>

  const { scores, recommended_careers, completed_at } = result

  return (
    <div className="results-page">
      <div className="container">
        <motion.div 
          className="results-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Your Career Assessment Results 🎉</h1>
          <p>Completed on {new Date(completed_at).toLocaleDateString()}</p>
        </motion.div>

        <div className="results-grid">
          <motion.div 
            className="scores-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2>Your Scores</h2>
            <div className="scores-list">
              {Object.entries(scores).map(([category, score]) => (
                <div key={category} className="score-item">
                  <div className="score-header">
                    <span className="score-category">{category}</span>
                    <span className="score-value">{Math.round(score)}%</span>
                  </div>
                  <div className="score-bar">
                    <motion.div 
                      className="score-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="recommendations-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Recommended Careers</h2>
            {recommended_careers && recommended_careers.length > 0 ? (
              <div className="careers-list">
                {recommended_careers.map((career, index) => (
                  <motion.div 
                    key={career.id || index}
                    className="career-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="career-rank">#{index + 1}</div>
                    <div className="career-info">
                      <h3>{career.name}</h3>
                      <p>{career.description}</p>
                      <div className="match-score">
                        <span>Match:</span>
                        <span className="match-value">{career.match_score}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p>No career recommendations available.</p>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="results-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/assessment" className="btn-results">Retake Assessment</Link>
          <Link to="/dashboard" className="btn-results btn-secondary">Back to Dashboard</Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Results