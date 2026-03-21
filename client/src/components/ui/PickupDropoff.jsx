import { useState } from "react"

function PickupDropoff({
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    pickupDate,
    setPickupDate,
    dropoffDate,
    setDropoffDate
}) {

    const [pickupActive, setPickupActive] = useState(true)
    const [dropoffActive, setDropoffActive] = useState(false)

    // SWAP FUNCTION
    const handleSwap = () => {
        const tempLocation = pickupLocation
        const tempDate = pickupDate

        setPickupLocation(dropoffLocation)
        setPickupDate(dropoffDate)

        setDropoffLocation(tempLocation)
        setDropoffDate(tempDate)
    }

    return (

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 items-center w-full">

            {/* PICK-UP */}
            <div
                className="bg-white shadow-lg rounded-xl px-6 py-5 w-full cursor-pointer"
                onClick={() => setPickupActive(!pickupActive)}
            >

                <div className="flex items-center gap-2 mb-5">
                    <span
                        className={`w-3 h-3 rounded-full ${pickupActive ? "bg-blue-600" : "bg-gray-300"}`}
                    ></span>

                    <p className="font-semibold text-gray-700">
                        Pick - Up
                    </p>
                </div>

                <div className="grid grid-cols-3">

                    {/* LOCATION */}
                    <div className="pr-4 border-r">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Locations
                        </p>

                        <input
                            type="text"
                            placeholder="Select your city"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                    {/* DATE */}
                    <div className="px-4 border-r">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Date
                        </p>

                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                    {/* TIME */}
                    <div className="pl-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Time
                        </p>

                        <input
                            type="time"
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                </div>
            </div>


            {/* SWAP BUTTON */}
            <div className="flex justify-center">
                <div
                    onClick={handleSwap}
                    className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:bg-blue-700 hover:scale-105 transition"
                >
                    ⇅
                </div>
            </div>


            {/* DROP-OFF */}
            <div
                className="bg-white shadow-lg rounded-xl px-6 py-5 w-full cursor-pointer"
                onClick={() => setDropoffActive(!dropoffActive)}
            >

                <div className="flex items-center gap-2 mb-5">

                    <span
                        className={`w-3 h-3 rounded-full ${dropoffActive ? "bg-blue-600" : "bg-gray-300"}`}
                    ></span>

                    <p className="font-semibold text-gray-700">
                        Drop - Off
                    </p>
                </div>

                <div className="grid grid-cols-3">

                    {/* LOCATION */}
                    <div className="pr-4 border-r">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Locations
                        </p>

                        <input
                            type="text"
                            placeholder="Select your city"
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                    {/* DATE */}
                    <div className="px-4 border-r">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Date
                        </p>

                        <input
                            type="date"
                            value={dropoffDate}
                            onChange={(e) => setDropoffDate(e.target.value)}
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                    {/* TIME */}
                    <div className="pl-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Time
                        </p>

                        <input
                            type="time"
                            className="w-full outline-none text-gray-500 text-sm"
                        />
                    </div>

                </div>
            </div>

        </div>

    )
}

export default PickupDropoff