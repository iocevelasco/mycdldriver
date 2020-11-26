const store = require('./store');
const config = require('../../config');

async function getJob(filter){
    let filterQuery = {}; 
    let resultDetail = {};
    if(filter.id){
        filterQuery.id = filter.id;
    }
    if(filter.company){
        filterQuery.company = filter.company;
    }
    if(filter.input){
        filterQuery.input = filter.input;
    }
    if(filter.city){
        filterQuery.city = filter.city;
    }
    if(filter.date){
        filterQuery.date = filter.date;
    }

    let result = await store.list(filterQuery);

    if(filter.id){
        resultDetail = {
            _id: result[0]._id,
            title: result[0].title,
            description: result[0].description,
            areaCode: result[0].areaCode,
            logo: result[0].logo,
            phoneNumber: result[0].phoneNumber,
            email: result[0].email,
            city: result[0].city,
            time: result[0].time,
            company: result[0].company,
            date: result[0].date,
            can_apply: true,
        };
        result = resultDetail;
    }

    if(filter.driver && filter.id){
        filterJob = {
            driver: filter.driver,
            job: filter.id
        };
        const driverapply = await store.getApplyJobs(filterJob);
        if(driverapply.length > 0){
            result.can_apply = false;
        }
    }
    return (result);
}

async function getJobsApply(filter){
    const result = await store.getApplyJobs(filter);
    switch(result.status){
        case 0: 
            result.status = "Pending";
            break;
        case 1: 
            result.status = "Approved";
            break;
        case 1: 
            result.status = "Rejected";
            break;
        default: 
            result.status = "Pending";
            break;
    }
    console.log("[ RESULT ]", result);
    return result;
}

function getCompanyJobsApply(filter){
    return new Promise((resolve, reject) => {
        resolve(store.getApplyCompanyJobs(filter));
    });
}

function getCustomList(){
    return new Promise((resolve, reject) => {
        resolve(store.getCustomList());
    });
}

function setStatus(id, status){
    return new Promise((resolve, reject) => {
        const result = store.setStatus(id, status);
        switch(result.status){
            case 200:
                resolve(result);
                break;
            case 500:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

function setRating(id, ranking){
    return new Promise((resolve, reject) => {
        const result = store.setRanking(id, ranking);
        switch(result.status){
            case 200:
                resolve(result);
                break;
            case 500:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

function addJob(job, company){
    return new Promise((resolve, reject) => {
        job.company = company;
        switch(job){
            case !job:
                console.error('[companyJobsController.addJob] No job data');
                reject('No job data');
                return false;
            case !job.company:
                console.error('[companyJobsController.addJob] No company data');
                reject('No company data');
                return false;
            case !job.title:
                console.error('[companyJobsController.addJob] No title data');
                reject('No title data');
                return false;
            case !job.description:
                console.error('[companyJobsController.addJob] No description data');
                reject('No description data');
                return false;
            case !job.city:
                console.error('[companyJobsController.addJob] No city data');
                reject('No city data');
                return false; 
            case !job.areaCode:
                console.error('[companyJobsController.addJob] No areaCode data');
                reject('No areaCode data');
                return false; 
            case !job.phoneNumber:
                console.error('[companyJobsController.addJob] No phoneNumber data');
                reject('No phoneNumber data');
                return false; 
            case !job.email:
                console.error('[companyJobsController.addJob] No email data');
                reject('No email data');
                return false; 
            case !job.time:
                console.error('[companyJobsController.addJob] No time data');
                reject('No time data');
                return false; 
        }
        
        const JobResolve = store.add(job); 
        resolve(JobResolve);
    });
}

function applyJob(jobApply){
    return new Promise((resolve, reject) => {
        if(!jobApply){
            console.error('[companyJobsController.applyJob] Invalid data');
            reject({status: 400, message: 'Invalid Job Apply data'});
            return false;
        }
        const result = store.applyJob(jobApply);
        
        switch(result.status){
            case 200:
                resolve(result);
                break;
            case 500:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

function updateJob(id, job, company, logo){
    return new Promise((resolve, reject) => {
        if(!job){
            console.error('[companyJobsController.updateJob] No company data');
            reject({status: 400, message: 'No company data'});
            return false;
        }
        const result = store.update(id, job, company);
        switch(result.status){
            case 200:
                resolve(result);
                break;
            case 401:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

function deleteJob(id, company){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('Invalid data');
            return false;
        }
        store.delete(id, company)
            .then((data) => {
                switch(data.status){
                    case 404:
                        reject(data);
                        break;
                    case 200:
                        resolve(data);
                        break;
                    default:
                        resolve(data);
                        break;
                }
                
            })
            .catch(e => {
                reject(e); 
            });
    });
}

module.exports = {
    getJob,
    addJob,
    updateJob,
    deleteJob,
    applyJob,
    getCustomList,
    getJobsApply,
    getCompanyJobsApply,
    setStatus,
    setRating
}