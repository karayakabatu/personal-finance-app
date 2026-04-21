import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import UserDashboardPage from './pages/UserDashboardPage.jsx'
import AdvisorDashboardPage from './pages/AdvisorDashboardPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import useAuthStore from './store/authStore.js'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-row">
            <h1>Personal Finance App</h1>
            {isAuthenticated && (
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
          <nav className="nav">
            <Link className={location.pathname === '/' ? 'active' : ''} to="/">
              Login
            </Link>
            <Link className={location.pathname === '/admin' ? 'active' : ''} to="/admin">
              Admin Dashboard
            </Link>
            <Link className={location.pathname === '/user' ? 'active' : ''} to="/user">
              User Dashboard
            </Link>
            <Link className={location.pathname === '/advisor' ? 'active' : ''} to="/advisor">
              Advisor Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisor"
            element={
              <ProtectedRoute allowedRole="advisor">
                <AdvisorDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
