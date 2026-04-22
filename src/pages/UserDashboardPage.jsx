import { useState, useEffect } from 'react'
import useAuthStore from '../store/authStore.js'
import useFinanceStore from '../store/financeStore.js'

function IncomeSection({ incomeInput, onIncomeChange, onSaveIncome, income }) {
  return (
    <section className="dashboard-section">
      <h3>1) Monthly Income</h3>
      {income !== null && (
        <p>
          Current income: <strong className="income">${income.amount}</strong>
        </p>
      )}
      <form onSubmit={onSaveIncome}>
        <input
          type="number"
          placeholder="Enter monthly income"
          value={incomeInput}
          onChange={(event) => onIncomeChange(event.target.value)}
        />
        <button type="submit" className="btn-primary">
          {income === null ? 'Save Income' : 'Update Income'}
        </button>
      </form>
    </section>
  )
}

function ExpenseForm({
  title,
  amount,
  category,
  categories,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
  editingId,
}) {
  return (
    <section className="dashboard-section">
      <h3>2) Expense Entry</h3>
      <form onSubmit={onSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
        />
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((currentCategory) => (
            <option key={currentCategory} value={currentCategory}>
              {currentCategory}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary">
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </section>
  )
}

function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <section className="dashboard-section">
      <h3>3) Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        <ul className="transaction-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="transaction-item card">
              <div>
                <strong>{expense.title}</strong>
                <p>{expense.category}</p>
              </div>
              <div className="transaction-actions">
                <strong className="expense">${expense.amount}</strong>
                <button type="button" className="btn-secondary" onClick={() => onEdit(expense)}>
                  Edit
                </button>
                <button type="button" className="btn-secondary" onClick={() => onDelete(expense.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function SummaryCards({ totalIncome, totalExpenses, remainingBalance }) {
  return (
    <section className="dashboard-section">
      <h3>4) Budget Summary</h3>
      <div className="card-grid">
        <div className="card">
          <div className="metric-title">Total Income</div>
          <div className="metric-value income">${totalIncome}</div>
        </div>
        <div className="card">
          <div className="metric-title">Total Expenses</div>
          <div className="metric-value expense">${totalExpenses}</div>
        </div>
        <div className="card">
          <div className="metric-title">Remaining Balance</div>
          <div className={`metric-value ${remainingBalance >= 0 ? 'income' : 'expense'}`}>
            ${remainingBalance}
          </div>
        </div>
      </div>
    </section>
  )
}

function UserDashboardPage() {
  const categories = ['Grocery', 'Rent', 'Phone Bill', 'Entertainment', 'Transportation', 'Other']

  const email = useAuthStore((state) => state.email)
  const { expenses, income, loading, fetchData, saveIncome, addExpense, updateExpense, deleteExpense } =
    useFinanceStore()

  const [incomeInput, setIncomeInput] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Grocery')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    if (email) fetchData(email)
  }, [email])

  const handleSaveIncome = async (event) => {
    event.preventDefault()
    const parsedIncome = Number(incomeInput)
    if (Number.isNaN(parsedIncome) || parsedIncome < 0) return
    await saveIncome(email, parsedIncome)
    setIncomeInput('')
  }

  const handleSubmitExpense = async (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    const parsedAmount = Number(amount)
    if (!trimmedTitle || Number.isNaN(parsedAmount) || parsedAmount < 0) return

    if (editingId) {
      await updateExpense(editingId, trimmedTitle, parsedAmount, category)
      setEditingId(null)
    } else {
      await addExpense(email, trimmedTitle, parsedAmount, category)
    }

    setTitle('')
    setAmount('')
    setCategory('Grocery')
  }

  const handleEdit = (expense) => {
    setEditingId(expense.id)
    setTitle(expense.title)
    setAmount(String(expense.amount))
    setCategory(expense.category)
  }

  const handleDelete = async (expenseId) => {
    await deleteExpense(expenseId)
    if (editingId === expenseId) {
      setEditingId(null)
      setTitle('')
      setAmount('')
      setCategory('Grocery')
    }
  }

  const totalIncome = income?.amount ?? 0
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBalance = totalIncome - totalExpenses

  if (loading) return <div className="page card"><p>Loading...</p></div>

  return (
    <div className="page card">
      <h2>User Dashboard</h2>
      <p>Enter income first, then manage expenses and track your budget.</p>

      <IncomeSection
        incomeInput={incomeInput}
        onIncomeChange={setIncomeInput}
        onSaveIncome={handleSaveIncome}
        income={income}
      />

      {income === null ? (
        <section className="dashboard-section">
          <p>Please add your monthly income to unlock expense management.</p>
        </section>
      ) : (
        <>
          <ExpenseForm
            title={title}
            amount={amount}
            category={category}
            categories={categories}
            onTitleChange={setTitle}
            onAmountChange={setAmount}
            onCategoryChange={setCategory}
            onSubmit={handleSubmitExpense}
            editingId={editingId}
          />
          <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
          <SummaryCards
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            remainingBalance={remainingBalance}
          />
        </>
      )}
    </div>
  )
}

export default UserDashboardPage
