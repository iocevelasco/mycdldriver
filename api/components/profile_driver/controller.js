const store = require('./store');
const config = require('../../config');

function getDriver() {
    return new Promise((resolve, reject) => {
        const response = store.list();
        switch (response.status) {
            case 200:
                resolve(response);
                break;
            default:
                reject(response);
                break;
        }
    });
}

function addDriver(driver) {
    return new Promise((resolve, reject) => {
        if (!driver) {
            console.error('[driverController.addDriver] No driver data');
            reject('[driverController.addDriver] No driver data');
            return false;
        }

        const fullDriver = {
            dln: driver.dln,
            imageDln: driver.imageDln,
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
        switch (driverResolve.status) {
            case 201:
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

function updateDriver(id, driver) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject({
                status: 400,
                message: 'No user ID'
            });
            return false;
        }
        if (!driver) {
            reject({
                status: 400,
                message: 'No user data'
            });
            return false;
        }

        const fullDriver = {
            birthDate: driver.birthDate,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
            sex: driver.sex,
            address: driver.address,
            address2: driver.address2,
            zipCode: driver.zipCode,
            city: driver.city,
            state: driver.state
        };

        const user = {
            name: driver.base.name,
            lastname: driver.base.lastname,
            photo: driver.base.photo,
            password: driver.password,
            driver: fullDriver
        };
        try {
            const result = await store.update(id, user);
            switch (result.status) {
                case 200:
                    resolve(result);
                    break;
                default:
                    reject(result);
                    break;
            }
        } catch (e) {
            reject(e);
        }

    });
}

async function updateExperience(id, driver) {
    if (!id) {
        return {
            status: 400,
            message: 'Not id for driver'
        };
    }
    if (!driver) {
        return {
            status: 400,
            message: 'Not data to driver update'
        };
    }

    try {
        const result = await store.experience(id, driver);
        return result;
    } catch (e) {
        return {
            status: 500,
            message: 'Unexpected Error',
            detail: e
        };
    }

}

function deleteDriver(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
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

async function checkDriver(mail){
    if(!mail){
        return {
            status: 400,
            message: 'No email recived'
        }
    }

    try{
        const user = await store.check(mail);
        if(user){
            if(user.typeUser == 1){
                return {
                    status: 200,
                    message: {
                        isDriver: true,
                        user: user
                    }
                }
            }else{
                return {
                    status: 200,
                    message: {
                        isDriver: false,
                        user: user
                    }
                }
            }
        }else{
            return {
                status: 404,
                message: 'User not found'
            }
        }
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

module.exports = {
    getDriver,
    addDriver,
    updateDriver,
    deleteDriver,
    updateExperience,
    checkDriver
}