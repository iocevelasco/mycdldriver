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
    address: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    }
});

const ProfileCompany = mongoose.model('ProfileCompany', profileCompanySchema);
module.exports = ProfileCompany;