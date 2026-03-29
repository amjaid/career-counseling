import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { API_ENDPOINTS } from '../config/api'
import './Auth.css'

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', password_confirm: '',
    full_name: '', education_level: '', field_of_study: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.password_confirm) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        onLogin(data.user, data.access)
        navigate('/dashboard')
      } else {
        const firstError = Object.values(data).flat()[0]
        setError(firstError || 'Registration failed')
      }
    } catch (err) {
      setError('Connection error. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Start your career assessment journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={formData.password_confirm}
                onChange={(e) => setFormData({...formData, password_confirm: e.target.value})}
                placeholder="Confirm"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Full Name (Optional)</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              placeholder="Your full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Education Level</label>
              <select
                value={formData.education_level}
                onChange={(e) => setFormData({...formData, education_level: e.target.value})}
              >
                <option value="">Select</option>
                <option value="high_school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor's</option>
                <option value="master">Master's</option>
              </select>
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                value={formData.field_of_study}
                onChange={(e) => setFormData({...formData, field_of_study: e.target.value})}
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register