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

app.post('/expenses',async(req,res)=>{
    try{
        const expense = await new Expense({
            title:req.body.title,
            amount:req.body.amount,
            category:req.body.category
        })
        await expense.save()
        res.json(expense)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.delete('/expenses/:id',async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:'Expense Deleted'})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.put('/expenses/:id',async(req,res)=>{
    try{
        const expense = await Expense.findById(req.params.id)
        expense.title=req.body.title,
        expense.amount=req.body.amount,
        expense.category=req.body.category

        await expense.save()
        res.json(expense)
        
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`server is up and running on http://localhost:${process.env.PORT}`)
})