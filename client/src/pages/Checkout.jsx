import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PickupDropoff from "../components/ui/PickupDropoff";

function Checkout() {

    const { state } = useLocation();
    const car = state?.car;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleRentNow = () => {
        if (!car) {
            alert("No car selected");
            return;
        }

        const bookingData = {
            car,

            // form data
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,

            // pickup (direct state)
            pickupLocation,
            pickupDate,
            pickupTime,

            // dropoff (direct state)
            dropoffLocation,
            dropoffDate,
            dropoffTime,

            totalPrice: car.pricePerDay,
        };

        console.log("Booking Saved:", bookingData); // 🔍 DEBUG

        const existing = JSON.parse(localStorage.getItem("bookings")) || [];

        localStorage.setItem(
            "bookings",
            JSON.stringify([...existing, bookingData])
        );

        navigate("/my-bookings");
    };
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [isPickupActive, setIsPickupActive] = useState(true)
    const [isDropoffActive, setIsDropoffActive] = useState(true)

    const [openDropdown, setOpenDropdown] = useState(null)


    // PICKUP
    const [pickupLocation, setPickupLocation] = useState("")
    const [pickupDate, setPickupDate] = useState("")
    const [pickupTime, setPickupTime] = useState("")

    // DROPOFF
    const [dropoffLocation, setDropoffLocation] = useState("")
    const [dropoffDate, setDropoffDate] = useState("")
    const [dropoffTime, setDropoffTime] = useState("")


    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pickupLocation: "",
        pickupDate: "",
        pickupTime: "",
        dropoffLocation: "",
        dropoffDate: "",
        dropoffTime: "",
    });
    return (
        <div className="bg-[#F6F7F9] min-h-screen py-10 px-6">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Billing Info */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">

                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-[18px] font-semibold text-[#1A202C]">Billing Info</h2>
                                <p className="text-sm text-[#90A3BF]">Please enter your billing info</p>
                            </div>
                            <p className="text-sm text-[#90A3BF]">Step 1 of 4</p>
                        </div>

                        {/* GRID FIX */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A202C] mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl text-sm outline-none"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A202C] mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                    className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl text-sm outline-none"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A202C] mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl text-sm outline-none"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A202C] mb-2">
                                    Town / City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Town or city"
                                    className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl text-sm outline-none"
                                />
                            </div>

                        </div>
                    </div>


                    {/* Rental Info */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">

                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-[18px] font-semibold text-[#1A202C]">Rental Info</h2>
                                <p className="text-sm text-[#90A3BF]">Please select your rental date</p>
                            </div>
                            <p className="text-sm text-[#90A3BF]">Step 2 of 4</p>
                        </div>

                        {/* PICKUP */}
                        <div className="mb-6">

                            <div
                                className="flex items-center gap-2 mb-4 cursor-pointer"
                                onClick={() => setIsPickupActive(!isPickupActive)}
                            >
                                <span
                                    className={`w-3 h-3 rounded-full ${isPickupActive ? "bg-blue-600" : "border-2 border-gray-300"
                                        }`}
                                />
                                <p className="text-[#1A202C] font-medium">Pick - Up</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                                {/* LOCATION */}
                                <div>
                                    <label className="block mb-2">Locations</label>
                                    <input
                                        type="text"
                                        list="cities"
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                        placeholder="Select your city"
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                    <datalist id="cities">
                                        <option value="Kochi" />
                                        <option value="Trivandrum" />
                                        <option value="Kollam" />
                                    </datalist>
                                </div>

                                {/* DATE */}
                                <div>
                                    <label className="block mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>

                                {/* TIME */}
                                <div className="relative">
                                    <label className="block mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* DROPOFF */}
                        <div>

                            <div
                                className="flex items-center gap-2 mb-4 cursor-pointer"
                                onClick={() => setIsDropoffActive(!isDropoffActive)}
                            >
                                <span
                                    className={`w-3 h-3 rounded-full ${isDropoffActive ? "bg-blue-600" : "border-2 border-gray-300"
                                        }`}
                                />
                                <p className="text-[#1A202C] font-medium">Drop - Off</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                                {/* LOCATION */}
                                <div>
                                    <label className="block mb-2">Locations</label>
                                    <input
                                        type="text"
                                        list="cities"
                                        value={dropoffLocation}
                                        onChange={(e) => setDropoffLocation(e.target.value)}
                                        placeholder="Select your city"
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>

                                {/* DATE */}
                                <div>
                                    <label className="block mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={dropoffDate}
                                        onChange={(e) => setDropoffDate(e.target.value)}
                                        min={pickupDate || new Date().toISOString().split("T")[0]}
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>

                                {/* TIME */}
                                <div className="relative">
                                    <label className="block mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={dropoffTime}
                                        onChange={(e) => setDropoffTime(e.target.value)}
                                        className="w-full bg-[#F6F7F9] px-4 py-3 rounded-xl outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* Payment */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-[18px] font-semibold text-[#1A202C]">Payment Method</h2>
                                <p className="text-sm text-[#90A3BF]">Please enter your payment method</p>
                            </div>
                            <p className="text-sm text-[#90A3BF]">Step 3 of 4</p>
                        </div>

                        {/* Card */}
                        <div className="bg-[#F6F7F9] p-5 rounded-xl mb-4 border border-[#E5E7EB]">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="accent-blue-600"
                                    />
                                    Credit Card
                                </label>

                                {/* VISA + MASTERCARD */}
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 font-semibold text-sm">VISA</span>
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="w-3 h-3 bg-yellow-400 rounded-full -ml-2"></span>
                                </div>
                            </div>

                            {/* GRID (FIXED) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                                {/* Card Number */}
                                <div>
                                    <label className="block mb-2 text-[#1A202C]">Card Number</label>
                                    <input
                                        className="bg-white p-3 rounded-xl w-full outline-none"
                                        placeholder="Card number"
                                    />
                                </div>

                                {/* Expiration Date */}
                                <div>
                                    <label className="block mb-2 text-[#1A202C]">Expiration Date</label>
                                    <input
                                        className="bg-white p-3 rounded-xl w-full outline-none"
                                        placeholder="DD/MM/YY"
                                    />
                                </div>

                                {/* Card Holder */}
                                <div>
                                    <label className="block mb-2 text-[#1A202C]">Card Holder</label>
                                    <input
                                        className="bg-white p-3 rounded-xl w-full outline-none"
                                        placeholder="Card holder"
                                    />
                                </div>

                                {/* CVC */}
                                <div>
                                    <label className="block mb-2 text-[#1A202C]">CVC</label>
                                    <input
                                        className="bg-white p-3 rounded-xl w-full outline-none"
                                        placeholder="CVC"
                                    />
                                </div>

                            </div>

                        </div>
                        {/* PayPal */}
                        <div className="bg-[#F6F7F9] p-4 rounded-xl mb-4 flex justify-between items-center border border-[#E5E7EB]">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-blue-600"
                                />
                                PayPal
                            </label>
                            <span className="text-blue-500 font-semibold">PayPal</span>
                        </div>

                        {/* Bitcoin */}
                        <div className="bg-[#F6F7F9] p-4 rounded-xl flex justify-between items-center border border-[#E5E7EB]">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bitcoin"
                                    checked={paymentMethod === "bitcoin"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-blue-600"
                                />
                                Bitcoin
                            </label>
                            <span className="text-yellow-500 font-semibold">bitcoin</span>
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">

                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-[18px] font-semibold text-[#1A202C]">
                                    Confirmation
                                </h2>
                                <p className="text-sm text-[#90A3BF]">
                                    We are getting to the end. Just few clicks
                                </p>
                            </div>
                            <p className="text-sm text-[#90A3BF]">Step 4 of 4</p>
                        </div>

                        {/* Checkbox 1 */}
                        <div className="bg-[#F6F7F9] px-4 py-4 rounded-xl mb-3 flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 accent-gray-400" />
                            <p className="text-sm text-[#1A202C]">
                                I agree with sending marketing and newsletter emails.
                            </p>
                        </div>

                        {/* Checkbox 2 */}
                        <div className="bg-[#F6F7F9] px-4 py-4 rounded-xl mb-6 flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 accent-gray-400" />
                            <p className="text-sm text-[#1A202C]">
                                I agree with terms and conditions and privacy policy.
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleRentNow}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            Rent Now
                        </button>

                        {/* Footer */}
                        <div className="mt-6 flex items-start gap-3">
                            <span className="text-lg">🔒</span>
                            <div>
                                <p className="text-sm font-medium text-[#1A202C]">
                                    All your data are safe
                                </p>
                                <p className="text-sm text-[#90A3BF] mt-1">
                                    We are using the most advanced security to provide you the best experience ever.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* RIGHT */}
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] h-fit">

                    <h2 className="text-[18px] font-semibold mb-2">Rental Summary</h2>
                    <p className="text-sm text-[#90A3BF] mb-4">
                        Prices may change depending on the rental
                    </p>

                    <div className="flex gap-4 mb-4">
                        <img
                            src={car?.image}
                            alt={car?.name}
                            className="w-20 h-16 object-contain"
                        />

                        <div>
                            <p className="font-semibold">{car?.name}</p>
                            <p className="text-sm text-[#90A3BF]">
                                ⭐⭐⭐⭐⭐ {car?.reviewCount || 0}+ Reviewer
                            </p>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal</span>
                        <span>${car?.pricePerDay}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <span>Tax</span>
                        <span>$0</span>
                    </div>

                    <div className="bg-[#F6F7F9] p-3 rounded-lg mb-4 flex justify-between text-sm">
                        <span>Apply promo code</span>
                        <span className="text-blue-600 cursor-pointer">Apply now</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Rental Price</span>
                        <span>${car?.pricePerDay}</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Checkout