import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

function AdminDashboardPage() {
  const [stats, setStats] = useState({ userCount: 0, totalExpenses: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [{ data: expenses }, { data: incomes }] = await Promise.all([
        supabase.from('expenses').select('amount, user_email'),
        supabase.from('incomes').select('amount, user_email'),
      ])

      const totalExpenses = (expenses ?? []).reduce((sum, e) => sum + e.amount, 0)
      const totalRevenue = (incomes ?? []).reduce((sum, i) => sum + i.amount, 0)
      const uniqueUsers = new Set([
        ...(expenses ?? []).map((e) => e.user_email),
        ...(incomes ?? []).map((i) => i.user_email),
      ]).size

      setStats({ userCount: uniqueUsers, totalExpenses, totalRevenue })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) return <div className="page card"><p>Loading...</p></div>

  return (
    <div className="page card">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin. Here is a live platform overview.</p>

      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Active Users</div>
          <div className="metric-value">{stats.userCount}</div>
        </div>
        <div className="card">
          <div className="metric-title">Total Declared Income</div>
          <div className="metric-value income">${stats.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="metric-title">Total Expenses</div>
          <div className="metric-value expense">${stats.totalExpenses.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
