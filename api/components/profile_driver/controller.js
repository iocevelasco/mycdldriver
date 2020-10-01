const store = require('./store');
const config = require('../../config');

function getDriver(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addDriver(driver, user, imageCdl){
    return new Promise((resolve, reject) => {
        if(!driver){
            console.error('[driverController] No driver data');
            reject('[driverController] No driver data');
            return false;
        }
        if(!user){
            console.error('[driverController] No user data');
            reject('[driverController] No user data');
            return false;
        }
        const fileUrl = imageCdl ? config.publicRoute + config.filesRoute + '/' + imageCdl.filename : '';

        const fullDriver = {
            cdl: driver.cdl,
            birthDate: driver.birthDate,
            imageCdl: fileUrl,
            sex: driver.sex,
            rating: driver.rating,
            address: driver.address,
            habilities: driver.habilities,
            description: driver.description,
            user: user
        };

        const driverResolve = store.add(fullDriver); 
        resolve(driverResolve);
    });
    
}

module.exports = {
    getDriver,
    addDriver
}