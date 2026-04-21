function AdvisorDashboardPage() {
  return (
    <div className="page card">
      <h2>Advisor Dashboard</h2>
      <p>Welcome, Advisor. Here are your client highlights.</p>

      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Clients This Month</div>
          <div className="metric-value">27</div>
        </div>
        <div className="card">
          <div className="metric-title">Portfolio Growth</div>
          <div className="metric-value income">+8.4%</div>
        </div>
        <div className="card">
          <div className="metric-title">Pending Reviews</div>
          <div className="metric-value">6</div>
        </div>
      </div>
    </div>
  )
}

export default AdvisorDashboardPage
