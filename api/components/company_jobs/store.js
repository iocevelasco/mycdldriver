const {TagsModel, JobsModel, JobsApplysModel} = require('./model');
const { User } = require('../user/model');
const ProfileCompany = require('../profile_company/model');
const mongoose = require('mongoose');
const fs = require('fs');

function capitalize(text) {
    return text.replace(/\b\w/g , function(m){ return m.toUpperCase(); } );
}

async function saveTags(tags){
    let array = [];
    try{
        array = await Promise.all(tags.map(async (tag) => { 
            let element = new TagsModel(tag);
            const tagEncontrado = await TagsModel.findOneAndUpdate(
                {name: capitalize(tag.name)},
                {name: capitalize(element.name)},
                {upsert: true, new: true, rawResult: true}
            );
            return tagEncontrado.value._id;
        }));
    }catch(e){
        console.log(e);
    }
    
    return array;
}

function getJobs(filterCompany){
    return new Promise((resolve, reject) => {
        let filter = {};
        let filterOr = [];
        if(filterCompany.company){
            filter = filterCompany;
        }
        if(filterCompany.id){
            filter = {_id: filterCompany.id};
        }
        if(filterCompany.input){
            filterOr.push({title: new RegExp(filterCompany.input, 'i')});
            filterOr.push({description: new RegExp(filterCompany.input, 'i')});
        }
        if(filterCompany.city){
            filterOr.push({city: new RegExp(filterCompany.city, 'i')});
        }
        if(filterCompany.date){
            filterOr.push({date: filterCompany.date});
        }
        if(filterOr.length > 1){
            filter = {$or: filterOr};
        }else if(filterOr.length == 1 && filterCompany.input){
            filter = {
                title: new RegExp(filterCompany.input, 'i'),
                description: new RegExp(filterCompany.input, 'i')
            };
        }else if(filterOr.length == 1 && filterCompany.city){
            filter = {
                city: new RegExp(filterCompany.city, 'i')
            };
        }
        result = JobsModel.find(filter)
            .select("-__v")
            .populate('company')
            .populate('tags');

        resolve(result);
    });
}

function getApplyJobs(filterQuery){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterQuery){
            filter = filterQuery;
        }
        result = JobsApplysModel.find(filter)
        .populate('company')
        .populate('driver')
        .populate('job');
        resolve(result);
    });
}

async function setStatus(id, status){
    const filter = {
        _id: id
    };
    try{
        if(!id){
            throw new Error();
        }
        const apply = await JobsApplysModel.findOne(filter);
        console.log(apply);
        apply.status = status;
        await apply.save();
        return {
            status: 200,
            message: 'Ok'
        };
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Invalid data recived for apply job'
        };
    }
    
}

async function setRanking(id, ranking){
    const filter = {
        _id: id
    };
    try{
        const apply = await JobsApplysModel.findOne(filter);
        if(!id){
            throw new Error();
        }
        apply.ranking = ranking;
        await apply.save();
        return {
            status: 200,
            message: 'Ok'
        };
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Invalid data recived for apply job'
        };
    }
}

async function getApplyCompanyJobs(query){
    let result = []; 
    var id = mongoose.Types.ObjectId(query.company);
    if(id){
        filter = {company: id};
    }
    const jobs = await JobsModel.find(filter);
    result = await Promise.all(jobs.map( async (job) => {
        let item = {
            id: job._id,
            title: job.title,
            description: job.description,
            areaCode: job.areaCode,
            logo: job.logo,
            phoneNumber: job.phoneNumber,
            email: job.email,
            city: job.city,
            time: job.time,
            tags: job.tags
        };
        const filterApply = {
            job: job._id,
            status: 0
        };
        let applys = await JobsApplysModel.find(filterApply);
        let driversApply = await Promise.all(applys.map( async (apply) =>{
            const filterDriver = {
                _id: apply.driver
            };
            const id = apply._id;
            let users = await User.findOne(filterDriver)
            .populate('driver');
            if(users){
                const { name, lastname, photo, email, driver } = users;
                return { id, name, lastname, photo, email, driver };
            }
        }));
        driversApply = driversApply.filter(Boolean);
        if(driversApply.length > 0){
            item.appys = driversApply;
            item.totaluser = driversApply.length;
            return item;
        }
    }));
    result = result.filter(Boolean);
    return result;
}

async function getCustomList(){
    const titles = await JobsModel.find({}).select("title");
    const citys = await JobsModel.find({}).distinct('city');
    const companys = await ProfileCompany.find({}).select("tradename");
    let titleArray = titles.map((job)=>{
        return job.title;
    });
    let companyArray = companys.map((company)=>{
        return company.tradename;
    });
    const listado = {
        title: titleArray,
        citys: citys,
        company: companyArray
    };

    return listado;
}

async function addJob(job){
    const listTags = await saveTags(job.tags);
    job.tags = listTags;
    const newJob = new JobsModel(job);
    await newJob.save();
    return newJob;
}

async function applyJob(job){
    try{
        const newApply = new JobsApplysModel(job);
        const resp = await newApply.save();
        if(resp){
            return {
                status: 200,
                message: 'Ok'
            };
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Invalid data recived for apply job'
        };
    }
}

async function updateJob(id, job, company){
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if(!foundJob){
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if(company != company){//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }

    if(job.title){
        foundJob.title = job.title;
    }
    if(job.description){
        foundJob.description = job.description;
    }
    if(job.city){
        foundJob.city = job.city;
    }
    if(job.time){
        foundJob.time = job.time;
    }
    if(job.areaCode){
        foundJob.areaCode = job.areaCode;
    }
    if(job.phoneNumber){
        foundJob.phoneNumber = job.phoneNumber;
    }
    if(job.email){
        foundJob.email = job.email;
    }
    if(job.logo){
        try {
            fs.unlinkSync("." + foundJob.photo);
        } catch(err) {
            console.error(err);
        }
        foundJob.logo = job.logo;
    }
    if(job.tags.length > 0){
        const listTags = await saveTags(job.tags);
        if(listTags){
            foundJob.tags = listTags;
        }
    }
    
    await foundJob.save();
    return {
        status: 200,
        message: 'Ok'
    };
}

async function deleteJob(id, company){
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if(!foundJob){
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if(company != company){//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }
        
    await JobsModel.deleteOne({
        _id: id
    });
    
    return {
        status: 200,
        message: 'Job ' + foundJob.title + ' Borrado correctamente'
    };

}

module.exports = {
    list: getJobs,
    add: addJob,
    update: updateJob,
    delete: deleteJob,
    applyJob,
    getCustomList,
    getApplyJobs,
    getApplyCompanyJobs,
    setStatus,
    setRanking
}