import { useEffect, useState } from "react";
import { getUserBookings, deleteBooking } from "../services/bookingService";

function MyBookings() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await getUserBookings();

            // 🔥 if API has no data → use localStorage
            if (!res?.data || res.data.length === 0) {
                const localData =
                    JSON.parse(localStorage.getItem("bookings")) || [];
                setBookings(localData);
            } else {
                setBookings(res.data);
            }
        } catch (error) {
            // 🔥 fallback to localStorage if API fails
            const localData =
                JSON.parse(localStorage.getItem("bookings")) || [];
            setBookings(localData);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id, index) => {
        try {
            if (id) {
                await deleteBooking(id);
                fetchBookings();
            } else {
                const updated = bookings.filter((_, i) => i !== index);
                setBookings(updated);
                localStorage.setItem("bookings", JSON.stringify(updated));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found</p>
            ) : (
                bookings.map((item, index) => {
                    const car = item.car || item;

                    return (
                        <div
                            key={item._id || index}
                            className="bg-white shadow rounded-xl p-5 mb-5 flex gap-6 items-center"
                        >
                            {/* IMAGE */}
                            <img
                                src={car?.image}
                                alt={car?.name}
                                className="w-32 h-24 object-contain"
                            />

                            {/* DETAILS */}
                            <div className="flex-1">

                                <h3 className="text-lg font-semibold">
                                    {car?.name}
                                </h3>

                                <p className="text-sm text-gray-500 mb-1">
                                    ₹{item.totalPrice} / day
                                </p>

                                <p className="text-sm">
                                    <b>Pickup:</b> {item.pickupLocation || "-"} |{" "}
                                    {item.pickupDate || "-"} |{" "}
                                    {item.pickupTime || "-"}
                                </p>

                                <p className="text-sm">
                                    <b>Drop:</b> {item.dropoffLocation || "-"} |{" "}
                                    {item.dropoffDate || "-"} |{" "}
                                    {item.dropoffTime || "-"}
                                </p>

                                <p className="text-sm text-gray-600 mt-1">
                                    <b>User:</b> {item.name || "-"}
                                </p>

                                <p className="text-sm text-gray-600">
                                    <b>Phone:</b> {item.phone || "-"}
                                </p>

                                <p className="text-sm text-gray-600">
                                    <b>Address:</b> {item.address || "-"}, {item.city || "-"}
                                </p>

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => handleCancel(item._id, index)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>
                    );
                })
            )}

        </div>
    );
}

export default MyBookings;