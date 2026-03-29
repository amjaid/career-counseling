import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Pages.css'

function Assessment({ user }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/questions/')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false))
  }, [])

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token')
    setSubmitting(true)

    try {
      const res = await fetch('http://localhost:8000/api/assessments/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      })

      const data = await res.json()
      
      if (res.ok) {
        navigate(`/results/${data.result_id}`)
      } else {
        alert('Error submitting assessment')
      }
    } catch (err) {
      alert('Connection error')
    } finally {
      setSubmitting(false)
    }
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  if (loading) {
    return <div className="assessment-loading">Loading questions...</div>
  }

  if (questions.length === 0) {
    return <div className="assessment-loading">No questions available. Please contact admin.</div>
  }

  return (
    <div className="assessment-page">
      <div className="container">
        <div className="assessment-header">
          <h1>Career Assessment</h1>
          <p>Question {currentIndex + 1} of {questions.length}</p>
        </div>

        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.id}
            className="question-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <span className="question-category">{currentQuestion.category}</span>
            <h2>{currentQuestion.question_text}</h2>
            
            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`option-btn ${answers[currentQuestion.id] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(currentQuestion.id, index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="assessment-nav">
          <button 
            className="btn-nav btn-prev" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          <div className="question-dots">
            {questions.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''} ${answers[questions[index]?.id] !== undefined ? 'answered' : ''}`}
              />
            ))}
          </div>

          {currentIndex === questions.length - 1 ? (
            <button 
              className="btn-nav btn-submit"
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length !== questions.length}
            >
              {submitting ? 'Submitting...' : 'Get Results'}
            </button>
          ) : (
            <button 
              className="btn-nav btn-next"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Assessment