const mongoose = require('mongoose');

const profileDriverSchema = mongoose.Schema({
    dln: {
        type: Number,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    imageDln: {
        type: String,
        trim: true
    },
    areaCode: {
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    sex: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        trim: true
    },
    experience : {
        type: Number,
        trim: true
    },
    zipCode: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
});

const ProfileDriver = mongoose.model('ProfileDriver', profileDriverSchema);
module.exports = ProfileDriver;