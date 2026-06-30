import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {
  const [expenses, setExpenses] = useState([])
  const [title,setTitle] = useState('')
  const [amount,setAmount] = useState('')
  const [category,setCategory] = useState('')
  const [editId,setEditId] = useState(null)

  useEffect(()=>{
    getExpenses()
  },[])

  const getExpenses = async()=>{
    const response = await axios.get('http://localhost:5001/expenses')
    setExpenses(response.data)
  }

  const addExpense = async()=>{
    if(!title.trim()||!amount||!category.trim()) return;
    await axios.post('http://localhost:5001/expenses',{title,amount,category})
    setTitle('')
    setAmount('')
    setCategory('')
    getExpenses()
  }

  const deleteExpense = async(id)=>{
    await axios.delete(`http://localhost:5001/expenses/${id}`)
    getExpenses()
  }

  const updateExpense = async()=>{
    await axios.put(`http://localhost:5001/expenses/${editId}`,{title,amount,category})
    setTitle('')
    setAmount('')
    setCategory('')
    setEditId(null)
    getExpenses()
  }

  return (
  <div className="container">

    <div className="expense-box">

      <h1 className="heading">Expense Tracker</h1>

      <div className="form">

        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={editId ? updateExpense : addExpense}
        >
          {editId ? "Update Expense" : "Add Expense"}
        </button>

      </div>

      <div className="expense-list">

        {expenses.map((expense) => (
          <div className="expense-card" key={expense._id}>

            <div className="expense-info">

              <h2>{expense.title}</h2>

              <p className="amount">₹ {expense.amount}</p>

              <span className="category">
                {expense.category}
              </span>

            </div>

            <div className="buttons">

              <button
                className="edit-btn"
                onClick={() => {
                  setTitle(expense.title);
                  setAmount(expense.amount);
                  setCategory(expense.category);
                  setEditId(expense._id);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
);
}

export default App
