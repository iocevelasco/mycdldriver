const storeService = require('../services/store');
const storeJobs = require('../company_jobs/store');
const storeUser = require('../user/store');

async function getDashboardAdmin() {
    try {
        let result = {};
        const service = await storeService.getServices();
        if (service.status == 200) {
            result.service = service.message;
        } else {
            result.service = [];
        }

        const jobs = await storeJobs.list({});
        try {
            result.jobs = jobs;
        }catch(e){
            result.jobs = [];
        }

        const drivers = await storeUser.list(1);
        if (drivers.status == 200) {
            result.drivers = drivers.message;
        } else {
            result.drivers = [];
        }

        const search = await storeJobs.getCustomList();
        try {
            result.search = search;
        }catch(e){
            result.search = [];
        }

        return ({ status: 200, message: result });
    } catch (e) {
        console.log('Error controller: ', e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

module.exports = {
    getDashboardAdmin
}