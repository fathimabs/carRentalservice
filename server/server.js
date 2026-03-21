const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes")
const connectDB = require('./config/db');
const carRoute = require('./routes/carRoutes');

const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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