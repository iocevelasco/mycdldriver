const store = require('./store');
const config = require('../../config');

function getDriver(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addDriver(driver, imageDln){
    return new Promise((resolve, reject) => {
        if(!driver){
            console.error('[driverController] No driver data');
            reject('[driverController] No driver data');
            return false;
        }

        const fileUrl = imageDln ? config.publicRoute + config.filesRoute + '/' + imageDln.filename : '';

        const fullDriver = {
            dln: driver.dln,
            imageDln: fileUrl,
            expDateDln: driver.expDateDln,
            birthDate: driver.birthDate,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
            sex: driver.sex,
            experience: driver.experience,
            address: driver.address,
            zipCode: driver.zipCode,
            description: driver.description
        };

        const user = {
            name: driver.base.name,
            lastname: driver.base.lastname,
            typeUser: driver.base.typeUser,
            photo: driver.base.photo,
            email: driver.base.email,
            google_id: driver.base.google_id,
            facebook_id: driver.base.facebook_id,
            driver: fullDriver
        };

        const driverResolve = store.add(user); 
        resolve(driverResolve);
    });
    
}

function deleteDriver(id){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('Invalid data');
            return false;
        }
        store.delete(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e); 
            });
    });
}

module.exports = {
    getDriver,
    addDriver,
    deleteDriver
}