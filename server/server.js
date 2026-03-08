const express = require('express')

const dotenv=require('dotenv')
dotenv.config()

const cors=require('cors')

const carRoute = require("./routes/carRoute");

const app=express()

app.use(cors())
app.use(express.json())


app.use('/api/cars', carRoute)

app.listen(5000,()=>{
    console.log("Morent server connected");
    
})