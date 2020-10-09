const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileDriverSchema = mongoose.Schema({
    cdl: {
        type: Number,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    imageCdl: {
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
    habilities: {
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
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    }
});

const ProfileDriver = mongoose.model('ProfileDriver', profileDriverSchema);
module.exports = ProfileDriver;