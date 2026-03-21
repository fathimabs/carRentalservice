import { useState } from "react"
import PickupDropoff from "../components/ui/PickupDropoff"
import { createBooking } from "../services/bookingService"
import { useNavigate } from "react-router-dom"

function Booking() {

    const [pickupLocation, setPickupLocation] = useState("")
    const [pickupDate, setPickupDate] = useState("")
    const [dropoffDate, setDropoffDate] = useState("")
    const [dropoffLocation, setDropoffLocation] = useState("")

    const navigate = useNavigate()

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
            setDropoffLocation("")

            navigate("/checkout")

        } catch (error) {
            console.error("Booking failed", error)
        }
    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-10">
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

            <div className="flex justify-center mt-10">
                <button
                    onClick={handleBooking}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                >
                    Confirm Booking
                </button>
            </div>

        </div>

    )
}

export default Booking