import { useEffect, useState } from "react"
import { getUserBookings, deleteBooking } from "../services/bookingService"

function MyBookings() {

    const [bookings, setBookings] = useState([])

    const fetchBookings = async () => {
        try {
            const res = await getUserBookings()
            setBookings(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleCancel = async (id) => {
        try {
            await deleteBooking(id)
            fetchBookings()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>My Bookings</h1>

            {bookings.map((booking) => (
                <div key={booking._id}>

                    <p>Pickup: {booking.pickupLocation}</p>
                    <p>Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()}</p>
                    <p>Dropoff Date: {new Date(booking.dropoffDate).toLocaleDateString()}</p>
                    <p>Price: ₹{booking.totalPrice}</p>

                    <button onClick={() => handleCancel(booking._id)}>
                        Cancel Booking
                    </button>

                </div>
            ))}

        </div>
    )
}

export default MyBookings