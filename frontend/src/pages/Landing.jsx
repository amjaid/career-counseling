import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Landing.css'

function Landing({ user }) {
  const features = [
    { icon: '📊', title: 'Self-Assessment', desc: 'Discover your interests, skills, and values' },
    { icon: '🎯', title: 'Career Matching', desc: 'Get personalized career recommendations' },
    { icon: '📈', title: 'Track Progress', desc: 'Monitor your career development over time' },
    { icon: '👩‍🏫', title: 'Expert Guidance', desc: 'AI-powered insights for your future' },
  ]

  return (
    <div className="landing">
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Discover Your <span className="highlight">Perfect Career</span></h1>
            <p>Take our comprehensive assessment to find career paths that match your interests, skills, and values.</p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/dashboard" className="btn-hero btn-primary">Go to Dashboard</Link>
              ) : (
                <>
                  <Link to="/register" className="btn-hero btn-primary">Start Free Assessment</Link>
                  <Link to="/login" className="btn-hero btn-secondary">Login</Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Discover Your Future?</h2>
            <p>Join thousands of students who have found their ideal career path.</p>
            <Link to="/register" className="btn-hero btn-primary">Get Started Now</Link>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Career Counseling System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing