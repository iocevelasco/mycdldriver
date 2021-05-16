const mongoose = require('mongoose');
const validator = require('validator');
const { CitiesModel, StatesModel } = require('../cities/model');
const Schema = mongoose.Schema;

const serviceSchema = mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true
   },
   detail: {
      type: String,
      required: true,
      trim: true
   },
   image: {
      type: String,
      default: 'https://mycdldriver-images.s3-us-west-2.amazonaws.com/placeholder-01.jpg',
      trim: true
   },
   email: {
      type: String,
      required: true,
      lowercase: true,
      validate: value => {
         if (!validator.isEmail(value)) {
            throw new Error({ error: 'Invalid Email address' })
         }
      }
   },
   phone: [{
      number: {
         type: String,
         trim: true
      }
   }],
   company: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
   },
   whatsapp: {
      type: String,
      trim: true
   },
   includeService: [{
      description: {
         type: String,
         trim: true
      }
   }],
   state: {
      type: Schema.ObjectId,
      ref: StatesModel,
   },
   city: {
      type: Schema.ObjectId,
      ref: CitiesModel,
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const Services = mongoose.model('Services', serviceSchema);
module.exports = Services;