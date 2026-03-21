import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/ui/CarCard";
import PickupDropoff from "../components/ui/PickupDropoff";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";

function Home() {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

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
    navigate("/booking");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

        <div className="relative p-8 rounded-2xl overflow-hidden min-h-[360px] text-white bg-gradient-to-r from-blue-400 to-blue-500">
          <h2 className="text-3xl font-bold mb-4 max-w-[300px]">
            The Best Platform for Car Rental
          </h2>
          <p className="mb-6 max-w-[260px]">
            Ease of doing a car rental safely and reliably.
          </p>
          <button className="bg-blue-700 px-6 py-2 rounded-lg mt-2">
            Rental Car
          </button>
          <img
            src={car1}
            alt="car"
            className="absolute -bottom-3 right-8 w-[360px] drop-shadow-2xl"
          />
        </div>

        <div className="relative p-8 rounded-2xl overflow-hidden min-h-[360px] text-white bg-gradient-to-r from-blue-600 to-blue-800">
          <h2 className="text-3xl font-bold mb-4 max-w-[300px]">
            Easy way to rent a car at a low price
          </h2>
          <p className="mb-6 max-w-[260px]">
            Providing cheap car rental services.
          </p>
          <button className="bg-blue-400 px-6 py-2 rounded-lg mt-2">
            Rental Car
          </button>
          <img
            src={car2}
            alt="car"
            className="absolute -bottom-11 right-10 w-[330px] scale-x-[-1] drop-shadow-2xl"
          />
        </div>

      </div>

      {/* PICKUP / DROPOFF */}
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

      {/* LOADING */}
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="mt-12 space-y-12">

          {/* POPULAR */}
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-[#90A3BF] font-semibold text-sm">
                Popular Car
              </h2>
              <span className="text-blue-500 text-sm cursor-pointer">
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
            <h2 className="text-[#90A3BF] font-semibold text-sm mb-6">
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