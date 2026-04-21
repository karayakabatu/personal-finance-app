function GoalsPage() {
  return (
    <div className="page card">
      <h2>Goals Page</h2>
      <p>Monitor your savings goals and progress.</p>
      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Emergency Fund</div>
          <div className="metric-value">$4,100</div>
        </div>
        <div className="card">
          <div className="metric-title">Vacation Goal</div>
          <div className="metric-value income">$1,200</div>
        </div>
      </div>
    </div>
  )
}

export default GoalsPage
