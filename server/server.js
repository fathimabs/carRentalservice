const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()


const carRoute = require("./routes/carRoute")
const bookingRoutes = require("./routes/bookingRoutes")

const app = express()

app.use(cors())
app.use(express.json())




app.use("/api/cars", carRoute)
app.use("/api/bookings", bookingRoutes)

app.listen(5000, () => {
  console.log("Morent server connected on port 5000")
})