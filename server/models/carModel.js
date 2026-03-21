const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["SUV", "Sedan", "Hatchback", "Sport", "MPV", "Coupe", "Convertible",
            "Pickup", "Luxury", "Electric"
        ],
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    capacity: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true,
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true,
    },
    steering: {
        type: String,
        enum: ['Power', 'Manual'],
        default: 'Power',
    },
    gasoline: {
        type: Number,
        default: 90
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount:
    {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    flip: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);



module.exports = mongoose.model('Car', carSchema)
