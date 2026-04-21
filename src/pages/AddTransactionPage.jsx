function AddTransactionPage() {
  return (
    <div className="page card">
      <h2>Add Transaction Page</h2>
      <p>Create a new income or expense entry.</p>
      <input type="text" placeholder="Transaction name" />
      <input type="number" placeholder="Amount" />
      <button type="button" className="btn-primary">
        Save Transaction
      </button>
    </div>
  )
}

export default AddTransactionPage
