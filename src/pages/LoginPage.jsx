import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const role = useAuthStore((state) => state.role)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    login(email.trim())

    if (email.toLowerCase().includes('admin')) {
      navigate('/admin')
    } else if (email.toLowerCase().includes('advisor')) {
      navigate('/advisor')
    } else {
      navigate('/user')
    }
  }

  if (isAuthenticated) {
    if (role === 'admin') {
      return <Navigate to="/admin" replace />
    }

    if (role === 'advisor') {
      return <Navigate to="/advisor" replace />
    }

    return <Navigate to="/user" replace />
  }

  return (
    <div className="login-wrapper">
      <div className="page card login-card">
        <h2>Login</h2>
        <p>Please enter your email and password.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
