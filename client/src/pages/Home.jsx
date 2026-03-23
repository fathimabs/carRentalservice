import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/ui/CarCard";
import PickupDropoff from "../components/ui/PickupDropoff";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import Button from "../components/common/Button"

function Home() {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const popularCars = cars.slice(0, 4);
  const recommendedCars = cars.slice(4, 12);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/cars?limit=12");
      const data = await res.json();
      setCars(data.cars);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = () => {
    navigate("/cars");
  };

  return (
    <div className="w-full px-6 lg:px-12 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">

        {/* LEFT CARD */}
        <div className="relative h-[320px] rounded-2xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500 flex items-center px-10">

          {/* TEXT */}
          <div className="z-10 max-w-[280px] text-white">
            <h2 className="text-[26px] font-semibold leading-snug mb-4">
              The Best Platform for Car Rental
            </h2>

            <p className="text-[14px] opacity-90 mb-6 leading-relaxed">
              Ease of doing a car rental safely and reliably. Of course at a low price.
            </p>

            <button
              onClick={() => navigate("/cars")}
              className="bg-blue-700 px-6 py-2 rounded-lg text-sm"
            >
              Rental Car
            </button>
          </div>

          {/* CAR IMAGE */}
          <img
            src={car1}
            alt="car"
            className="absolute right-6 bottom-0 w-[380px] object-contain"
          />
        </div>


        {/* RIGHT CARD */}
        <div className="relative h-[320px] rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 flex items-center px-10">

          {/* TEXT */}
          <div className="z-10 max-w-[280px] text-white">
            <h2 className="text-[26px] font-semibold leading-snug mb-4">
              Easy way to rent a car at a low price
            </h2>

            <p className="text-[14px] opacity-90 mb-6 leading-relaxed">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>

            <button
              onClick={() => navigate("/cars")}
              className="bg-blue-400 px-6 py-2 rounded-lg text-sm"
            >
              Rental Car
            </button>
          </div>

          {/* CAR IMAGE */}
          <img
            src={car2}
            alt="car"
            className="absolute  right-7 bottom-0 w-[360px] object-contain scale-x-[-1]"
          />
        </div>

      </div>
      {/* PICKUP / DROPOFF */}

        {/* ✅ CALL HERE */}
        <PickupDropoff
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          dropoffLocation={dropoffLocation}
          setDropoffLocation={setDropoffLocation}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          dropoffDate={dropoffDate}
          setDropoffDate={setDropoffDate}
          pickupTime={pickupTime}
          setPickupTime={setPickupTime}
          dropoffTime={dropoffTime}
          setDropoffTime={setDropoffTime}
        />

      

      {/* CAR LIST */}
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="mt-12 space-y-10">

          {/* POPULAR */}
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-[#90A3BF] text-sm font-semibold">
                Popular Car
              </h2>

              <span
                onClick={() => navigate("/cars")}
                className="text-blue-500 text-sm cursor-pointer"
              >
                View All
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </div>

          {/* RECOMMENDED */}
          <div>
            <h2 className="text-[#90A3BF] text-sm font-semibold mb-6">
              Recommendation Car
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* BUTTON */}
      <div className="text-center mt-10">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Show more car
        </button>
      </div>

    </div>
  );
}

export default Home;