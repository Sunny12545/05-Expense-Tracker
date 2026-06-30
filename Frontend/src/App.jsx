import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {
  const [expenses, setExpenses] = useState([])

  useEffect(()=>{
    getExpenses()
  },[])

  const getExpenses = async()=>{
    const response = await axios.get('http://localhost:5001/expenses')
    setExpenses(response.data)
  }

  return (
    <>
    <h1>Expense Tracker</h1>
    {expenses.map((expense)=>(
      <div key={expense._id}>
        <h2>{expense.title}</h2>
        <p>{expense.amount}</p>
        <p>{expense.category}</p>
        <hr />
      </div>
    ))}
    </>
  )
}

export default App
