import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      fetch('http://localhost:8000/api/auth/me/', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('access_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (userData, token) => {
    setUser(userData)
    localStorage.setItem('access_token', token)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />} />
          <Route path="/assessment" element={user ? <Assessment user={user} /> : <Login onLogin={handleLogin} />} />
          <Route path="/results/:id" element={user ? <Results user={user} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App