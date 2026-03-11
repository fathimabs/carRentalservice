const Booking = require("../models/Booking")

// create booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body)
        res.status(201).json(booking)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get bookings of a user
exports.getUserBookings = async (req, res) => {
    try {
        const { userId } = req.query

        const bookings = await Booking.find({ userId })
            .populate("carId")

        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params

        await Booking.findByIdAndDelete(id)

        res.json({ message: "Booking cancelled successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}