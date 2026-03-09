const express = require("express")
const router = express.Router()

const {
    createBooking,
    getUserBookings,
    deleteBooking
} = require("../controllers/bookingController")

// create booking
router.post("/", createBooking)

// get bookings for logged user
router.get("/user", getUserBookings)

// cancel booking
router.delete("/:id", deleteBooking)

module.exports = router