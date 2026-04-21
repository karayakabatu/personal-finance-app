function TransactionsPage() {
  const transactions = [
    { id: 1, title: 'Salary', amount: 3000, type: 'income' },
    { id: 2, title: 'Groceries', amount: 120, type: 'expense' },
    { id: 3, title: 'Freelance Project', amount: 800, type: 'income' },
    { id: 4, title: 'Internet Bill', amount: 55, type: 'expense' },
  ]

  return (
    <div className="page card">
      <h2>Transactions Page</h2>
      <p>Simple transaction list with income and expense amounts.</p>

      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <span>{transaction.title}</span>
            <strong className={transaction.type}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionsPage
