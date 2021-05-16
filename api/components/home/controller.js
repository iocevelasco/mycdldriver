const storeService = require('../service/store');


async function getDashboardAdmin(typeUser) {
    try {
        let result = {};
        const service = await storeService.getServices();
        if (service.status == 200) {
            result.service = service.message;
        } else {
            result.service = [];
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