const express = require('express')
const { getAllCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController')

const carRoute = express.Router()

carRoute.get('/', getAllCars)
carRoute.get('/:id', getCarById)
carRoute.post('/', createCar)
carRoute.put('/:id', updateCar)
carRoute.delete('/:id', deleteCar)

module.exports = carRoute 