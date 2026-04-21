function BudgetPage() {
  return (
    <div className="page card">
      <h2>Budget Page</h2>
      <p>Track your monthly budget at a glance.</p>
      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Budget Limit</div>
          <div className="metric-value">$3,500</div>
        </div>
        <div className="card">
          <div className="metric-title">Spent</div>
          <div className="metric-value expense">$2,780</div>
        </div>
      </div>
    </div>
  )
}

export default BudgetPage
