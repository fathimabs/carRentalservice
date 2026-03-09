const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')

const carRoute = require("./routes/carRoute");
const authRoutes = require("./routes/authRoutes");
const mongoose = require('mongoose');
const connectDB = require('./config/db');


const app = express()

app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB();



app.use('/api/cars', carRoute)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("Morent server connected");

})