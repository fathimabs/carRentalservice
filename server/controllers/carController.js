const Car = require("../models/carModel");

//  GET /api/cars 

const getCars = async (req, res) => {

    try {

    } catch (error) {

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
            new: true,
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