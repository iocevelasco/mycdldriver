const store = require('./store');
const config = require('../../config');

function getDriver(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addDriver(driver){
    return new Promise((resolve, reject) => {
        if(!driver){
            console.error('[driverController.addDriver] No driver data');
            reject('[driverController.addDriver] No driver data');
            return false;
        }

        const fullDriver = {
            dln: driver.dln,
            imageDln: driver.imageDln,
            expDateDln: driver.expDateDln,
            birthDate: driver.birthDate,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
            sex: driver.sex,
            experience: driver.experience,
            address: driver.address,
            address2: driver.address2,
            zipCode: driver.zipCode,
            city: driver.city,
            state: driver.state,
            description: driver.description
        };

        const user = {
            name: driver.base.name,
            lastname: driver.base.lastname,
            typeUser: driver.base.typeUser,
            photo: driver.base.photo,
            email: driver.base.email,
            password: driver.password,
            google_id: driver.base.google_id,
            facebook_id: driver.base.facebook_id,
            driver: fullDriver
        };

        const driverResolve = store.add(user); 
        switch(driverResolve.status){
            case 200:
                resolve(driverResolve);
                break;
            case 500:
                reject(driverResolve);
                break;
            case 400:
                reject(driverResolve);
                break;
            default:
                resolve(driverResolve);
                break;
        }
    });
    
}

function updateDriver(id, driver){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('[driverController.updateDriver] No user ID');
            return false;
        }
        if(!driver){
            reject('[driverController.updateDriver] No user data');
            return false;
        }

        const fullDriver = {
            dln: driver.dln,
            imageDln: driver.imageDln,
            expDateDln: driver.expDateDln,
            birthDate: driver.birthDate,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
            sex: driver.sex,
            experience: driver.experience,
            address: driver.address,
            address2: driver.address2,
            zipCode: driver.zipCode,
            city: driver.city,
            state: driver.state,
            description: driver.description
        };

        const user = {
            name: driver.base.name,
            lastname: driver.base.lastname,
            photo: driver.base.photo,
            password: driver.password,
            driver: fullDriver
        };
        
        const result = await store.update(id, user);
        resolve(result);
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
    updateDriver,
    deleteDriver
}