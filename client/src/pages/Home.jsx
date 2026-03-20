
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PickupDropoff from "../components/ui/PickupDropoff"

function Home() {

  const navigate = useNavigate()

  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")

  const handleSearch = () => {
    navigate("/cars")
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        {/* Card 1 */}
        <div className="bg-blue-500 text-white p-6 md:p-8 rounded-xl">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            The Best Platform for Car Rental
          </h2>

          <p className="mb-4 text-sm md:text-base">
            Ease of doing a car rental safely and reliably.
          </p>

          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg text-sm md:text-base">
            Rental Car
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-blue-700 text-white p-6 md:p-8 rounded-xl">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Easy way to rent a car at a low price
          </h2>

          <p className="mb-4 text-sm md:text-base">
            Providing cheap car rental services and safe facilities.
          </p>

          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm md:text-base">
            Rental Car
          </button>
        </div>

      </div>

      {/* PICKUP / DROPOFF */}
      <div className="flex flex-col items-center mt-6">

        <PickupDropoff
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          dropoffDate={dropoffDate}
          setDropoffDate={setDropoffDate}
        />

        {/* Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Show more car
          </button>
        </div>

      </div>

    </div>
  )
}

export default Home