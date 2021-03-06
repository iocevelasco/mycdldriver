const { TagsModel, JobsModel, JobsApplysModel } = require('./model');
const { User } = require('../user/model');
const ProfileCompany = require('../profile_company/model');
const ProfileDriver = require('../profile_driver/model');
const Incident = require('../incident/model');
const {CitiesModel} = require('../cities/model');
const mongoose = require('mongoose');
const fs = require('fs');
const { isArray } = require('lodash');

function capitalize(text) {
    return text.replace(/\b\w/g, function (m) { return m.toUpperCase(); });
}

async function saveTags(tags) {
    let array = [];
    try {
        array = await Promise.all(tags.map(async (tag) => {
            let element = new TagsModel(tag);
            const tagEncontrado = await TagsModel.findOneAndUpdate(
                { name: capitalize(tag.name) },
                { name: capitalize(element.name) },
                { upsert: true, new: true, rawResult: true }
            );
            return tagEncontrado.value._id;
        }));
    } catch (e) {
        console.log(e);
    }

    return array;
}

async function getJobs(filterCompany) {
    let filter = {};
    let filterOr = [];
    if (filterCompany.company) {
        filter = filterCompany;
    }
    if (filterCompany.id) {
        filter = { _id: filterCompany.id };
    }
    if (filterCompany.input) {
        filterOr.push({ title: new RegExp(filterCompany.input, 'i') });
        filterOr.push({ description: new RegExp(filterCompany.input, 'i') });
    }
    if (filterCompany.date) {
        filterOr.push({ date: filterCompany.date });
    }
    if (filterOr.length > 1) {
        filter = { $or: filterOr };
    } else if (filterOr.length == 1 && filterCompany.input) {
        filter = {
            title: new RegExp(filterCompany.input, 'i'),
            description: new RegExp(filterCompany.input, 'i')
        };
    }
    
    if (filterCompany.city) {
        filter.city = filterCompany.city;
    }
    filter.deleted = false;
    jobs = await JobsModel.find(filter)
        .select("-__v")
        .populate('city')
        .populate('state')
        .populate('tags');

    let result = await Promise.all(jobs.map(async (job) => {
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
            state: job.state,
            areaCode: job.areaCode,
            phoneNumber: job.phoneNumber,
        };
        const findComp = await User.findOne({
            company: job.company,
            typeUser: 2
        }).select('-tokens')
        .populate('company');
        try {
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
        } catch (e) {
            console.log(e);
        }
    }));
    result = result.filter(Boolean);
    return result;
}

async function getJob(idJob){
    if(!idJob){
        return {
            status: 400,
            message: 'No Id recived'
        }
    }
    try{
        job = await JobsModel.findOne({_id: idJob, deleted: false})
        .select("-__v")
        .populate('city')
        .populate('state')
        .populate('company')
        .populate('tags');
        return {
            status: 200,
            message: job
        }
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
    
}

function getApplyJobs(filterQuery) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterQuery) {
            filter = filterQuery;
        }
        result = JobsApplysModel.find(filter)
            .populate('company')
            .populate('driver')
            .populate('job');
        resolve(result);
    });
}

async function setStatus(id, status) {
    const filter = {
        _id: id
    };
    try {
        if (!id) {
            throw new Error();
        }
        const apply = await JobsApplysModel.findOne(filter)
        .populate('driver')
        .populate('company');
        apply.status = status;
        await apply.save();
        return {
            status: 200,
            message: 'Ok',
            user: apply.driver,
            company: apply.company
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: 'Invalid data recived for apply job'
        };
    }

}

async function setRanking(id, ranking, comment) {
    const filter = {
        _id: id
    };
    try {
        const apply = await JobsApplysModel.findOne(filter);
        if (!id) {
            throw new Error();
        }
        if (ranking) {
            apply.ranking = ranking;
        }
        if (comment) {
            apply.comment = comment;
        }
        await apply.save();
        const applyList = await JobsApplysModel.find({
            driver: apply.driver,
            ranking: { $gt: 0, $lt: 6 }
        });
        const listRank = applyList.map((apply) => {
            const result = apply.ranking;
            return result;
        });
        let sum = listRank.reduce((previous, current) => current += previous);
        let avg = sum / listRank.length;
        const user = await User.findOne({ _id: apply.driver }).select('driver');
        const driver = await ProfileDriver.findOne({ _id: user.driver });
        driver.rating = avg;
        await driver.save();
        return {
            status: 200,
            message: 'Ok'
        };
    } catch (e) {
        return {
            status: 500,
            message: 'Invalid data recived for apply job',
            detail: e
        };
    }
}

async function getApplyCompanyJobs(query) {
    let result = [];
    var id = mongoose.Types.ObjectId(query.company);
    if (id) {
        filter = { company: id };
    }
    filter.deleted = false;
    const jobs = await JobsModel.find(filter).populate('city');
    result = await Promise.all(jobs.map(async (job) => {
        let item = {
            id: job._id,
            title: job.title,
            description: job.description,
            areaCode: job.areaCode,
            logo: job.logo,
            phoneNumber: job.phoneNumber,
            email: job.email,
            city: job.city.cityName,
            time: job.time,
            tags: job.tags
        };
        const filterApply = {
            job: job._id,
            status: 0
        };
        let applys = await JobsApplysModel.find(filterApply);
        let driversApply = await Promise.all(applys.map(async (apply) => {
            const filterDriver = {
                _id: apply.driver
            };
            const id = apply._id;
            let users = await User.findOne(filterDriver)
                .populate('driver');
            const filterComment = {
                driver: apply.driver,
                status: 1,
                ranking: {$gt : 0}
            };
            let jobsComments = await JobsApplysModel
                .find(filterComment)
                .populate('company')
                .sort({'date': -1})
                .limit(5);

            if (users) {
                const { name, lastname, photo, email, driver } = users;
                return { id, name, lastname, photo, email, driver, jobsComments };
            }
        }));
        driversApply = driversApply.filter(Boolean);
        if (driversApply.length > 0) {
            item.appys = driversApply;
            item.totaluser = driversApply.length;
            return item;
        }
    }));
    result = result.filter(Boolean);
    return result;
}

async function getStaffCompanyJobs(query) {
    let result = [];
    var id = mongoose.Types.ObjectId(query.company);
    if (id) {
        filter = {
            company: id,
            $or: [{ status: 1 }, { status: 3 }]
        };
    }else{
        return {
            status: 400,
            message: "No valid company"
        }
    }
    try{
        const userCompany = await User.findOne({ company: id }).populate('company');
        const driversJob = await JobsApplysModel.find(filter).distinct('driver').populate('driver');
        const driverNoJob = await ProfileDriver.find({'companyJob.company': id, 'companyJob.status': true});
        const idDriver = driverNoJob.map((res)=>{
            return res._id;
        });
        const userNoJob = await User.find({driver: {$in: idDriver}});
        const drivers = driversJob.concat(userNoJob);

        result = await Promise.all(drivers.map(async (response) => {
            const userDriver = await User.findOne({ _id: response })
                .select('name lastname photo date email')
                .populate('driver');
            let resDriver = null;
            let completeFelds = 5;
            let totalFelds = 16;
            if (userDriver) {
                resDriver = {
                    id: userDriver._id,
                    name: userDriver.name,
                    lastname: userDriver.lastname,
                    photo: userDriver.photo,
                    email: userDriver.email,
                    date: userDriver.date,
                    driver: userDriver.driver
                };
                if(userDriver.driver.expDateDln){
                    completeFelds ++;
                }
                if(userDriver.driver.birthDate){
                    completeFelds ++;
                }
                if(userDriver.driver.imageDln){
                    completeFelds ++;
                }
                if(userDriver.driver.areaCode){
                    completeFelds ++;
                }
                if(userDriver.driver.phoneNumber){
                    completeFelds ++;
                }
                if(userDriver.driver.sex){
                    completeFelds ++;
                }
                if(userDriver.driver.rating){
                    completeFelds ++;
                }
                if(userDriver.driver.zipCode){
                    completeFelds ++;
                }
                if(userDriver.driver.description){
                    completeFelds ++;
                }
                if(userDriver.driver.address){
                    completeFelds ++;
                }
                if(userDriver.driver.address2){
                    completeFelds ++;
                }
                const completeProfile = completeFelds * 100 / totalFelds;
                resDriver.completeProfile = completeProfile;
            }
            const filterJob = {
                driver: response,
                company: id,
                $or: [{ status: 1 }, { status: 3 }]
            };
            const condition = {
                driver: userDriver._id,
                company: userCompany._id
            };
            const incidents = await Incident.find(condition).populate('job');
            resDriver.incidents = incidents;
            const jobsDriver = await JobsApplysModel.find(filterJob).populate('job');
            resDriver.jobs = await Promise.all(jobsDriver.map(async (resp) => {
                if (resp.job) {
                    let response = {
                        _id: resp.job._id,
                        tags: resp.job.tags,
                        title: resp.job.title,
                        status: resp.status,
                        historical: resp.historical,
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
                }
            }));
            resDriver.jobs = resDriver.jobs.filter(Boolean);
            return resDriver;
        }));
        try{
            const retorno = result.filter(Boolean);
            return {
                status: 200,
                message: retorno
            }
        }catch(e){
            console.log(e);
            return {
                status: 500,
                message: 'Unexpected Store error',
                detail: e
            }
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected Store error',
            detail: e
        }
    }
}

async function setHistory(id, history){
    try{
        const applyJob = await JobsApplysModel.findOne({_id: id});
        if(!applyJob.historical){
            applyJob.historical = [];
        }
        applyJob.historical = applyJob.historical.concat(history);
        applyJob.status = 3;
        await applyJob.save();
        return {
            status: 200,
            message: "Created"
        }
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

async function unlinkDriver(driver, company){
    try{
        const applyJob = await JobsApplysModel.find({driver: driver, company:company});
        const foundUser = await User.findOne({_id: driver});
        const foundDriver = await ProfileDriver.findOne({_id: foundUser.driver});
        if(isArray(foundDriver.companyJob) && foundDriver.companyJob.length > 0){
            const companyJobs = foundDriver.companyJob.map(e=>{
                if(String(e.company).trim() === String(company).trim()){
                    e.status = false;
                }
                return e;
            });
            foundDriver.companyJob = companyJobs;
            foundDriver.save();
        }
        
        applyJob.forEach(e => {
            e.status = 4;
            e.save();
        });
        return {
            status: 200,
            message: "Unlinked"
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

async function getCustomList() {
    const titles = await JobsModel.find({}).select("title");
    const citys = await JobsModel.find().distinct('city');
    const companys = await ProfileCompany.find({}).select("tradename");
    let titleArray = titles.map((job) => {
        return job.title;
    });
    let citysArray = await Promise.all(citys.map(async (city) => {
        const citie = await CitiesModel.findOne({_id: city});
        return {
            id: citie._id,
            name: citie.cityName
        };
    }));
    let companyArray = companys.map((company) => {
        return company.tradename;
    });
    const listado = {
        title: titleArray,
        citys: citysArray,
        company: companyArray
    };

    return listado;
}

async function addJob(job) {
    /*const listTags = await saveTags(job.tags);
    job.tags = listTags;*/
    const newJob = new JobsModel(job);
    await newJob.save();
    return newJob;
}

async function applyJob(job) {
    try {
        const foundJob = await JobsModel.findOne({ _id: job.job });
        job.company = foundJob.company;
        const foundCompanyUser = await User.findOne({ company: foundJob.company }).populate('company');
        const newApply = new JobsApplysModel(job);
        const resp = await newApply.save();
        if (resp) {
            return {
                status: 200,
                message: 'Ok',
                userCompany: foundCompanyUser
            };
        }else{
            return {
                status: 400,
                message: 'No apply saved'
            };
        }
    } catch (e) {
        return {
            status: 500,
            message: 'Invalid data recived for apply job',
            detail: e
        };
    }
}

async function inviteJob(job) {
    try {
        const newApply = new JobsApplysModel(job);
        const resp = await newApply.save();
        if (resp) {
            return {
                status: 200,
                message: 'Ok'
            };
        }else{
            return {
                status: 400,
                message: 'No apply saved'
            };
        }
    } catch (e) {
        return {
            status: 500,
            message: 'Invalid data recived for apply job',
            detail: e
        };
    }
}

async function updateJob(id, job, company) {
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if (!foundJob) {
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if (company != company) {//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }

    if (job.title) {
        foundJob.title = job.title;
    }
    if (job.description) {
        foundJob.description = job.description;
    }
    if (job.city) {
        foundJob.city = job.city;
    }
    if (job.state) {
        foundJob.city = job.city;
    }
    if (job.time) {
        foundJob.time = job.time;
    }
    if (job.areaCode) {
        foundJob.areaCode = job.areaCode;
    }
    if (job.phoneNumber) {
        foundJob.phoneNumber = job.phoneNumber;
    }
    if (job.email) {
        foundJob.email = job.email;
    }
    if (job.logo) {
        if(job.logo != foundJob.logo){
            try {
                fs.unlinkSync("." + foundJob.logo);
            } catch (err) {
                console.error(err);
            }
            foundJob.logo = job.logo;
        }
    }
    foundJob.active = job.active;
    /*if(job.tags.length > 0){
        const listTags = await saveTags(job.tags);
        if(listTags){
            foundJob.tags = listTags;
        }
    }*/

    await foundJob.save();
    return {
        status: 200,
        message: 'Ok'
    };
}

async function deleteJob(id, company) {
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if (!foundJob) {
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if (company != company) {//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }
    try{
        foundJob.deleted = true;
        await foundJob.save();
        return {
            status: 200,
            message: 'Job ' + foundJob.title + ' Borrado correctamente'
        };
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        };
    }
    

    

}

module.exports = {
    list: getJobs,
    getJob,
    add: addJob,
    update: updateJob,
    delete: deleteJob,
    applyJob,
    getCustomList,
    getApplyJobs,
    getApplyCompanyJobs,
    setStatus,
    setRanking,
    getStaffCompanyJobs,
    setHistory,
    unlinkDriver,
    inviteJob
}