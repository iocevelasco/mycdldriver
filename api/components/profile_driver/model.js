const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileDriverSchema = mongoose.Schema({
    dln: {
        type: Number,
        required: true,
        unique: true
    },
    expDateDln: {
        type: Date,
        required: true
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
        type: String
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
    },
    address2: {
        type: String,
        trim: true
    },
    state: {
        type: Schema.ObjectId,
        ref: 'States',
    },
    city: {
        type: Schema.ObjectId,
        ref: 'Cities',
    }
});

const ProfileDriver = mongoose.model('ProfileDriver', profileDriverSchema);
module.exports = ProfileDriver;