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
            console.error('[userController] No driver data');
            reject('[userController] No driver data');
            return false;
        }
        if(!user){
            console.error('[userController] No user data');
            reject('[userController] No user data');
            return false;
        }
        const fileUrl = imageCdl ? config.publicRoute + config.filesRoute + '/' + imageCdl.filename : '';

        const fullDriver = {
            cdl: driver.cdl,
            birthDate: driver.birthDate,
            imageCdl: fileUrl,
            sex: driver.sex,
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