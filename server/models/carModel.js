const mongoose= require('mongoose')

const carSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand :{
        type:String,
        required:true
    },
    pricePerDay:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    transmission:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    image:[
        {
        type:String
    }
    ],
    description:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Car',carSchema)