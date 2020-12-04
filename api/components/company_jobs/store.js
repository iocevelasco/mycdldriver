const {TagsModel, JobsModel, JobsApplysModel} = require('./model');
const { User } = require('../user/model');
const ProfileCompany = require('../profile_company/model');
const ProfileDriver = require('../profile_driver/model');
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

async function getJobs(filterCompany){
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
    jobs = await JobsModel.find(filter)
        .select("-__v")
        .populate('tags');

    let result = await Promise.all(jobs.map( async (job) => {
        let resp = {
            _id: job._id,
            tags: job.tags,
            title: job.title,
            time: job.time,
            logo: job.logo,
            image: job.image,
            email: job.email,
            description: job.description,
            date: job.date,
            city: job.city,
            areaCode: job.areaCode,
            phoneNumber: job.phoneNumber,
        };
        const findComp = await User.findOne({
            company: job.company,
            typeUser: 2
        }).select('-tokens')
        .populate('company');
        try{
            resp.company = {
                _id: findComp.company._id,
                tradename: findComp.company.tradename,
                legalNumber: findComp.company.legalNumber,
                areaCode: findComp.company.areaCode,
                phoneNumber: findComp.company.phoneNumber,
                address: findComp.company.address,
                address2: findComp.company.address2,
                description: findComp.company.description,
                name: findComp.name,
                lastname: findComp.lastname,
                photo: findComp.photo,
                email: findComp.email
            };
            return resp;
        }catch(e){
            //console.log(e);
        }
    }));
    result = result.filter(Boolean);
    return result;
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

async function setRanking(id, ranking, comment){
    const filter = {
        _id: id
    };
    try{
        const apply = await JobsApplysModel.findOne(filter);
        if(!id){
            throw new Error();
        }
        if(ranking){
            apply.ranking = ranking;
        }
        if(comment){
            apply.comment = comment;
        }
        
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

async function getStaffCompanyJobs(query){
    let result = []; 
    var id = mongoose.Types.ObjectId(query.company);
    if(id){
        filter = {
            company: id,
            status: 1
        };
    }
    const drivers = await JobsApplysModel.find(filter).distinct('driver').populate('driver');
    
    result = await Promise.all(drivers.map( async (response) => {
        const userDriver = await User.findOne({_id:response})
        .select('name lastname photo date email')
        .populate('driver');
        let resDriver = null;

        if(userDriver){
            resDriver = {
                id: userDriver._id,
                name: userDriver.name,
                lastname: userDriver.lastname,
                photo: userDriver.photo,
                email: userDriver.email,
                date: userDriver.date,
                driver: userDriver.driver
            };
            const filterJob = {
                driver: response,
                company: id,
                status: 1
            };
            const jobsDriver = await JobsApplysModel.find(filterJob).populate('job');
            resDriver.jobs = await Promise.all(jobsDriver.map( async (resp) => {
                let response = {
                    _id: resp.job._id,
                    tags: resp.job.tags,
                    title: resp.job.title,
                    description: resp.job.description,
                    areaCode: resp.job.areaCode,
                    phoneNumber: resp.job.phoneNumber,
                    logo: resp.job.logo,
                    email: resp.job.email,
                    city: resp.job.city,
                    time: resp.job.time,
                    apply: {
                        _id: resp._id,
                        ranking: resp.ranking,
                        comment: resp.comment
                    },
                };
                return response;
            }));
        }
        return resDriver;
    }));
    return result.filter(Boolean);
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
    setRanking,
    getStaffCompanyJobs
}