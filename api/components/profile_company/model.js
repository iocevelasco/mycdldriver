const mongoose = require('mongoose');
const { CitiesModel, StatesModel } = require('../cities/model');
const Schema = mongoose.Schema;

const profileCompanySchema = mongoose.Schema({
    tradename: {
        type: String,
        trim: true,
        required: true
    },
    legalNumber: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    areaCode: {
        type: String,
        trim: true
    },
    phoneNumber: {
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
    description: {
        type: String,
        trim: true
    },
    zipCode: {
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
    }
});

const ProfileCompany = mongoose.model('ProfileCompany', profileCompanySchema);
module.exports = ProfileCompany;