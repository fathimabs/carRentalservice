import { useState } from "react"
import PickupDropoff from "../components/ui/PickupDropoff"
import { createBooking } from "../services/bookingService"
import { useNavigate } from "react-router-dom"

function Booking() {

    const [pickupLocation, setPickupLocation] = useState("")
    const [pickupDate, setPickupDate] = useState("")
    const [dropoffDate, setDropoffDate] = useState("")
    const navigate = useNavigate()
    const [dropoffLocation, setDropoffLocation] = useState("")
    const handleBooking = async () => {
        try {

            const bookingData = {
                pickupLocation,
                pickupDate,
                dropoffDate,
                carId: "64f1a1b2c3d4e5f678901234",
                userId: "64f1a1b2c3d4e5f678901235",
                totalPrice: 200
            }

            await createBooking(bookingData)

            setPickupLocation("")
            setPickupDate("")
            setDropoffDate("")

            navigate("/my-bookings")

        } catch (error) {
            console.error("Booking failed", error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

            <div className="bg-white p-6 md:p-10 shadow-lg rounded-xl">

                <h1 className="text-2xl md:text-3xl font-bold mb-8">
                    Book Your Car
                </h1>

                <PickupDropoff
                    pickupLocation={pickupLocation}
                    setPickupLocation={setPickupLocation}
                    dropoffLocation={dropoffLocation}
                    setDropoffLocation={setDropoffLocation}
                    pickupDate={pickupDate}
                    setPickupDate={setPickupDate}
                    dropoffDate={dropoffDate}
                    setDropoffDate={setDropoffDate}
                />

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleBooking}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                    >
                        Confirm Booking
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Booking