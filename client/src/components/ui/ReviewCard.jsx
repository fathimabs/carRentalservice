function PickupDropoff({
    pickupLocation,
    setPickupLocation,
    pickupDate,
    setPickupDate,
    dropoffDate,
    setDropoffDate
}) {

    return (
        <div>

            <input
                type="text"
                placeholder="Pickup Location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
            />

            <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
            />

            <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
            />

        </div>
    )
}

export default PickupDropoff