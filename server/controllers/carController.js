const Car = require("../models/carModel");


const createCar = async (req, res) => {

    try {
        const { name, brand, pricePerDay, category, fuelType, transmission, seats, image, description } = req.body

        const newCar = new Car({
            name,
            brand,
            pricePerDay,
            category,
            fuelType,
            transmission,
            seats,
            image,
            description
        })

        const saveCar = await newCar.save()
        res.status(201).json(saveCar)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create car', error: error })
    }
}

const getAllCars = async (req, res) => {

    try {
        // Fetch all cars
        const cars = await Car.find()
        res.status(200).json(cars)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

const getCarById = async (req, res) => {

    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(200).json({ message: 'Car Not Found' })
        }
        res.status(200).json(car)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }

}

const updateCar = async (req, res) => {

    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({ message: 'Car Not Found' })
        }

        Object.assign(car, req.body)
        const updatedCar = await car.save()
        res.status(200).json(updatedCar)
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error: error.message });
    }
}

const deleteCar = async (req, res) => {

    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({ message: 'Car Not Found' })
        }
        await car, remove()
        res.status(200).json({ message: 'Car Removed Successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
}

module.exports = { createCar, getAllCars, getCarById, updateCar, deleteCar }