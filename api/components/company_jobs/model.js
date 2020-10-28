const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    }
});

const CompanyJobsSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    tags: [{
        type: Schema.ObjectId,
        ref: 'tagsJobs',
    }],
    company: {
        type: Schema.ObjectId,
        ref: 'ProfileCompany',
    }
});

const CompanyJobs = mongoose.model('CompanyJobs', CompanyJobsSchema);
const TagsJobs = mongoose.model('tagsJobs', tagSchema);
module.exports = {
    JobsModel: CompanyJobs,
    TagsModel: TagsJobs
};