require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Expense = require('./models/Expense')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected")
}).catch((err)=>[
    console.log(err)
])

app.get('/',(req,res)=>{
    res.send('Expense Api is Running')
})

app.get('/expenses',async(req,res)=>{
    try{
    const expenses = await Expense.find().sort({createdAt:-1})
    res.json(expenses)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`server is up and running on http://localhost:${process.env.PORT}`)
})