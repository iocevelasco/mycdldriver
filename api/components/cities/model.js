const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statesSchema = Schema({
    stateName: {
        type: String,
        trim: true
    },
    countryID: {
        type: String,
        trim: true
    },
    latitude: {
        type: String,
        trim: true
    },
    longitude: {
        type: String,
        trim: true
    }
});

const citiesSchema = Schema({
    cityName: {
        type: String,
        trim: true
    },
    countryID: {
        type: String,
        trim: true
    },
    latitude: {
        type: String,
        trim: true
    },
    longitude: {
        type: String,
        trim: true
    },
    stateID: {
        type: Schema.ObjectId,
        ref: 'states',
    }
});

const States = mongoose.model('states', statesSchema);
const Cities = mongoose.model('cities', citiesSchema);
module.exports = {
    StatesModel: States,
    CitiesModel: Cities,
};