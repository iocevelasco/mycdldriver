const mongoose = require('mongoose');
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
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    address: {
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
    }
});

const ProfileCompany = mongoose.model('ProfileCompany', profileCompanySchema);
module.exports = ProfileCompany;