const Booking = require("../models/Booking")

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body)
        const savedBooking = await booking.save()

        res.status(201).json(savedBooking)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get bookings of a user
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

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {

        const { id } = req.params

        await Booking.findByIdAndDelete(id)

        res.json({ message: "Booking cancelled successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}