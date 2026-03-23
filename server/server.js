const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes")
const connectDB = require('./config/db');
const carRoute = require('./routes/carRoutes');

const path = require("path");

const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// CORS configuration for cookies
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/cars', carRoute);
app.use("/api/bookings", bookingRoutes)
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Morent server connected on port ${PORT}`);
});