const mongoose = require('mongoose');
const { CitiesModel, StatesModel } = require('../cities/model');
const Schema = mongoose.Schema;

const profileDriverSchema = Schema({
    dln: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    expDateDln: {
        type: Date
    },
    birthDate: {
        type: Date
    },
    imageDln: {
        type: String,
        trim: true
    },
    medicCardImage: {
        type: String,
        trim: true
    },
    areaCode: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    sex: {
        type: Number
    },
    rating: {
        type: Number,
        trim: true,
        default: 0
    },
    twicCard: Boolean,
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
        ref: StatesModel,
    },
    city: {
        type: Schema.ObjectId,
        ref: CitiesModel,
    },
    experience: [{
        name: {
            type: String,
            trim: true
        },
        have: Boolean,
        years: {
            type: Number,
            default: 0
        }
    }],
    companyJob: [{
        company: {
            type: Schema.ObjectId,
            ref: 'ProfileCompany'
        },
        status: {
            type: Boolean,
            default: true
        }
    }]
});

const ProfileDriver = mongoose.model('ProfileDriver', profileDriverSchema);
module.exports = ProfileDriver;