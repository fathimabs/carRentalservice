const Car = require("../models/carModel");

//  GET /api/cars by filter

const getCars = async (req, res) => {

    try {
        // get query params from url
        const { search, category, minPrice, maxPrice, capacity, sort, page = 1, limit = 6 } = req.query

        //build filter object
        const filter = {}

        //add each filter ,it was provided

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ]
        }
        if (category) filter.category = category

        if (capacity) filter.capacity = { $gte: Number(capacity) }

        if (minPrice || maxPrice) {
            filter.pricePerDay = {}
            if (minPrice) filter.pricePerDay.$gte = Number(minPrice)
            if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
        }
        //sorting

        let sortOption = {}
        if (sort === 'priceLow') sortOption.pricePerDay = 1
        if (sort === 'priceHigh') sortOption.pricePerDay = 1
        if (sort === 'rating') sortOption.rating = 1

        //pagintaion

        const skip = (page - 1) * limit
        
        const cars = await Car.find(filter).
            sort(sortOption).skip(skip).limit(Number(limit))

        const total = await Car.countDocuments(filter)

        res.status(200).json({ success: true, total, cars });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//    GET /api/cars/:id 
const getCarById = async (req, res) => {

    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.status(200).json({ success: true, car });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  POST /api/cars 
const createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ success: true, car });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//  PUT /api/cars/:id 
const updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true,
        });
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.status(200).json({ success: true, car });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//  DELETE /api/cars/:id 
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.status(200).json({ success: true, message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllCars = getCars;

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };