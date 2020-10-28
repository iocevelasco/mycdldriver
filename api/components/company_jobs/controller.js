const store = require('./store');
const config = require('../../config');

function getJob(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
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
            case !job.time:
                console.error('[companyJobsController.addJob] No time data');
                reject('No time data');
                return false; 
        }
        const JobResolve = store.add(job); 
        resolve(JobResolve);
    });
}

function updateJob(id, job, company){
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
    deleteJob
}