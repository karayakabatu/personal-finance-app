function AdminDashboardPage() {
  return (
    <div className="page card">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin. Here is a quick platform overview.</p>

      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Active Users</div>
          <div className="metric-value">1,240</div>
        </div>
        <div className="card">
          <div className="metric-title">Monthly Revenue</div>
          <div className="metric-value income">$84,300</div>
        </div>
        <div className="card">
          <div className="metric-title">System Alerts</div>
          <div className="metric-value expense">3</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
