const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  driver: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  job: {
    type: Schema.ObjectId,
    ref: 'CompanyJobs',
    required: true,
  },
  images: [{
    url: {
      type: String,
      trim: true
    }
  }]
})

const Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident;