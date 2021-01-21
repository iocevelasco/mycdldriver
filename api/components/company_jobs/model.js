const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    }
});

const historicalSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

/*
STATUS: {
    0: "Creado, esperando aprobacion o rechazo",
    1: "Aprobado y activo",
    2: "Rechazado, nunca trabajo en la empresa",
    3: "Desvinculado"
}
*/
const JobsApplysSchema = mongoose.Schema({
    company: {
        type: Schema.ObjectId,
        ref: 'ProfileCompany',
        required: true,
    },
    driver: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    job: {
        type: Schema.ObjectId,
        ref: 'CompanyJobs',
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    ranking: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        trim: true
    },
    historical: [{
        description: {
            type: String,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
JobsApplysSchema.index({ company: 1, driver: 1, job: 1 }, { unique: true });

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
        type: Schema.ObjectId,
        ref: 'cities'
    },
    state: {
        type: Schema.ObjectId,
        ref: 'states'
    },
    time: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean
    },
    tags: [{
        type: Schema.ObjectId,
        ref: 'tagsJobs',
    }],
    company: {
        type: Schema.ObjectId,
        ref: 'ProfileCompany',
        required: true
    },
    image: {
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
    logo: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const CompanyJobs = mongoose.model('CompanyJobs', CompanyJobsSchema);
const TagsJobs = mongoose.model('tagsJobs', tagSchema);
const JobsApplys = mongoose.model('JobsApplys', JobsApplysSchema);
module.exports = {
    JobsModel: CompanyJobs,
    TagsModel: TagsJobs,
    JobsApplysModel: JobsApplys
};