const store = require('./store');
const config = require('../../config');
const mailer = require('../../middelware/mailer');

async function getJob(filter) {
    let filterQuery = {};
    let resultDetail = {};
    if (filter.id) {
        filterQuery.id = filter.id;
    }
    if (filter.company) {
        filterQuery.company = filter.company;
    }
    if (filter.input) {
        filterQuery.input = filter.input;
    }
    if (filter.city) {
        filterQuery.city = filter.city;
    }
    if (filter.date) {
        filterQuery.date = filter.date;
    }

    let result = await store.list(filterQuery);

    if (filter.id) {
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

    if (filter.driver && filter.id) {
        filterJob = {
            driver: filter.driver,
            job: filter.id
        };
        const driverapply = await store.getApplyJobs(filterJob);
        if (driverapply.length > 0) {
            result.can_apply = false;
        }
    }
    return (result);
}

async function getJobsApply(filter) {
    const result = await store.getApplyJobs(filter);
    switch (result.status) {
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
    return result;
}

function getCompanyJobsApply(filter) {
    return new Promise((resolve, reject) => {
        resolve(store.getApplyCompanyJobs(filter));
    });
}

function getCompanyStaffApply(filter) {
    return new Promise((resolve, reject) => {
        resolve(store.getStaffCompanyJobs(filter));
    });
}

async function setHistory(id, history){
    if(!id){
        return {
            status: 400,
            message: 'No Id Apply Job recived'
        }
    }
    if(!history){
        return {
            status: 400,
            message: 'No history Apply Job recived'
        }
    }
    console.log('CONTROLLER', {id: id, body: history});
    try{
        const result = await store.setHistory(id, history);
        return result;
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected error in controller',
            detail: e
        }
    }
}

function getCustomList() {
    return new Promise((resolve, reject) => {
        resolve(store.getCustomList());
    });
}

function setStatus(id, status) {
    return new Promise((resolve, reject) => {
        const result = store.setStatus(id, status);
        switch (result.status) {
            case 200:
                try{
                    console.log('[ STATUS APPLY ]', status);
                    if(status == 1){
                        mailer(
                            result.user.email, 
                            'Has been accepted', 
                            `Good news ${result.user.name} ${result.user.lastname}!`,
                            `${result.company.tradename} accepted your application, you will be hearing from them in the next days.    
                            <p>Go tell the good new to everyone! </p>`);
                    }else if(status == 2){
                        mailer(
                            result.user.email, 
                            'Has been rejected', 
                            ``,
                            `Hello ${result.user.name} ${result.user.lastname}, we regret to inform that you application was rejected! Don¿t lose hope, there are more companies looking for you, here <a href="${config.baseurl}">${config.baseurl}</a> you can send more applications.
                            <p>Good luck, MyCDL Driver Team </p>`);
                    }
                }catch(e){
                    console.log(e);
                }
                
                resolve(result);
                break;
            default:
                reject(result);
                break;
        }
    });
}

async function setRating(id, ranking, commnet) {
    try{
        const result = await store.setRanking(id, ranking, commnet);
        return result;
    }catch(e){
        return {
            status: 500,
            message: 'Invalid data recived for apply job',
            detail: e
        };
    }
}

function addJob(job, company) {
    return new Promise((resolve, reject) => {
        job.company = company;
        switch (job) {
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
            case !job.state:
                console.error('[companyJobsController.addJob] No state data');
                reject('No state data');
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
            case !job.logo:
                console.error('[companyJobsController.addJob] No logo data');
                reject('No logo data');
                return false;
        }

        const JobResolve = store.add(job);
        resolve(JobResolve);
    });
}

function applyJob(jobApply) {
    return new Promise((resolve, reject) => {
        if (!jobApply) {
            reject({ status: 400, message: 'Invalid Job Apply data' });
            return false;
        }
        const result = store.applyJob(jobApply);

        switch (result.status) {
            case 200:
                try{
                    console.log('[ APPLY JOB MAILER ]');
                    const url_job_detail = `${config.baseurl}/job-offert?id=${jobApply.job}`;
                    const url_candidate = `${config.baseurl}/userProfile/company/candidate`;
                    mailer(
                        jobApply.user.email, 
                        'Job Application', 
                        `Your job application`,
                        `Hello ${jobApply.user.name} ${jobApply.user.lastname}, you applied for this <a href="${url_job_detail}">${url_job_detail}</a> job! Now we have to wait, in the meantime , you can send more applications here <a href="${config.baseurl}">${config.baseurl}</a>.  
                        <p>Good Luck, MyCDL Driver Team.</p>`);
                    mailer(
                        result.userCompany.email, 
                        'Job Application', 
                        ``,
                        `Hello ${result.userCompany.company.tradename}, you have a new driver application, here <a href="${url_candidate}">${url_candidate}</a> you can read the full profile.  
                        <p>Good Luck, MyCDL Driver Team.</p>`);
                }catch(e){
                    console.log(e);
                }
                
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

function updateJob(id, job, company) {
    return new Promise((resolve, reject) => {
        if (!job) {
            console.error('[companyJobsController.updateJob] No company data');
            reject({ status: 400, message: 'No company data' });
            return false;
        }
        console.log('[CONTROLLER]', job);
        const result = store.update(id, job, company);
        switch (result.status) {
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

function deleteJob(id, company) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid data');
            return false;
        }
        store.delete(id, company)
            .then((data) => {
                switch (data.status) {
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
    setRating,
    getCompanyStaffApply,
    setHistory
}