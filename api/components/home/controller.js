const storeDriver = require('../driver/store');
const storeTrucks = require('../trucks/store');
const storeLoads = require('../loads/store');
const User = require('../user/store');

async function getDashboardAdmin(typeUser) {
    try {
        let result = {};
        const drivers = await storeDriver.getDrivers();
        if (drivers.status == 200) {
            result.drivers = drivers.message;
        } else {
            result.drivers = [];
        }

        const trucks = await storeTrucks.list();
        if (trucks.status == 200) {
            result.trucks = trucks.message;
        } else {
            result.trucks = [];
        }

        const loads = await storeLoads.list();
        if (loads.status == 200) {
            result.loads = loads.message;
        } else {
            result.loads = [];
        }

        if (typeUser == 1) {
            const dispatcher = await User.list(3);
            if (dispatcher.status == 200) {
                result.dispatchers = dispatcher.message;
            } else {
                result.dispatcher = [];
            }
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