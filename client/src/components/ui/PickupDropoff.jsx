import { useState } from "react"

function PickupDropoff({
    pickupLocation,
    setPickupLocation,
    pickupDate,
    setPickupDate,
    dropoffDate,
    setDropoffDate
}) {

    const [pickupActive, setPickupActive] = useState(true)
    const [dropoffActive, setDropoffActive] = useState(false)

    return (
        <div className="flex flex-col items-center gap-6 mt-10 px-4">

            <div className="flex flex-col lg:flex-row items-center gap-6 w-full max-w-6xl">

                {/* PICK-UP */}
                <div
                    className="bg-white shadow-lg rounded-xl px-6 py-5 flex-1 w-full cursor-pointer"
                    onClick={() => setPickupActive(!pickupActive)}
                >

                    <div className="flex items-center gap-2 mb-5">
                        <span
                            className={`w-3 h-3 rounded-full ${pickupActive ? "bg-blue-600" : "bg-gray-300"
                                }`}
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
                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                    ⇄
                </div>


                {/* DROP-OFF */}
                <div
                    className="bg-white shadow-lg rounded-xl px-6 py-5 flex-1 w-full cursor-pointer"
                    onClick={() => setDropoffActive(!dropoffActive)}
                >

                    <div className="flex items-center gap-2 mb-5">

                        <span
                            className={`w-3 h-3 rounded-full ${dropoffActive ? "bg-blue-600" : "bg-gray-300"
                                }`}
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

        </div>
    )
}

export default PickupDropoff