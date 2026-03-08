const express = require('express')
const { getAllCars, getCarById } = require('../controllers/carController')

const carRoute = express.Router()

carRoute.get('/', getAllCars)      // GET /api/cars
carRoute.get('/:id', getCarById)   // GET /api/cars/:id

module.exports = carRoute