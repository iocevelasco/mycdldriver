const store = require('./store');
const config = require('../../config');

function getDriver(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addDriver(driver, imageCdl){
    return new Promise((resolve, reject) => {
        if(!driver){
            console.error('[driverController] No driver data');
            reject('[driverController] No driver data');
            return false;
        }

        const user = {
            name: driver.base.name,
            lastname: driver.base.lastname,
            photo: driver.base.photo,
            email: driver.base.email,
            provider_id: driver.base.provider_id
        };

        const fileUrl = imageCdl ? config.publicRoute + config.filesRoute + '/' + imageCdl.filename : '';

        const fullDriver = {
            cdl: driver.cdl,
            birthDate: driver.birthDate,
            imageCdl: fileUrl,
            sex: driver.sex,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
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