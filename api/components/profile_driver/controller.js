const store = require('./store');
const storeJob = require('../company_jobs/store');
const config = require('../../config');
const mailer = require('../../middelware/mailer');

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

        const expDefault = [
            {
                "name":"Tank Endorsed",
                "have":false,
                "years":0
            },
            {
                "name":"Hazmat",
                "have":false,
                "years":0
            },
            {
                "name":"Refrigerated Loads",
                "have":false,
                "years":0
            },
            {
                "name":"Van",
                "have":false,
                "years":0
            },
            {
                "name":"Car Carrier",
                "have":false,
                "years":0
            },
            {
                "name":"Flat Bed",
                "have":false,
                "years":0
            }
        ];

        const fullDriver = {
            dln: driver.dln,
            birthDate: driver.birthDate,
            areaCode: driver.areaCode,
            phoneNumber: driver.phoneNumber,
            sex: driver.sex,
            experience: expDefault,
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
                mailer(
                    user.email, 
                    'Welcome to MyCDL Driver!', 
                    `Your profile has been created , you can now start searching for your next job.`,
                    `Tip: For a better experience , remember to maintain your profile up to date. You can edit your profile here! 
                    <p>Have a great at day , My CDL Driver Team.</p>`);
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

async function checkDriver(mail) {
    if (!mail) {
        return {
            status: 400,
            message: 'No email recived'
        }
    }

    try {
        const user = await store.check(mail);
        if (user) {
            if (user.typeUser == 1) {
                return {
                    status: 200,
                    message: {
                        isDriver: true,
                        user: user
                    }
                }
            } else {
                return {
                    status: 200,
                    message: {
                        isDriver: false,
                        user: user
                    }
                }
            }
        } else {
            return {
                status: 404,
                message: 'User not found'
            }
        }
    } catch (e) {
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

async function addStaff(user, company) {
    if (!user) {
        return {
            status: 400,
            message: 'No user recived'
        }
    }

    try{
        const userFound = await store.check(user.email);
        if (userFound) {
            if (userFound.typeUser == 1) {
                try{
                    const foundJob = await storeJob.getJob(user.job);
                    if(foundJob.status == 200){
                        const jobResult = foundJob.message;
                        if(!foundJob){
                            return {
                                status: 404,
                                message: 'Job not found'
                            }
                        }
                        const applyJob = {
                            company: company._id,
                            driver: userFound._id,
                            job: jobResult._id,
                            status: 1
                        };
                        try{
                            return await storeJob.applyJob(applyJob);
                        }catch(e){
                            return {
                                status: 400,
                                message: 'Error: apply job error',
                                detail: e
                            }
                        }
                    }else{
                        return foundJob;
                    }
                    
                }catch(e){
                    return {
                        status: 400,
                        message: 'Error: find job error',
                        detail: e
                    }
                }
                
            }else{
                return {
                    status: 400,
                    message: 'The user is already registered as a company'
                }
            }
        }else{
            
            
            const expDefault = [
                {
                    "name":"Tank Endorsed",
                    "have":false,
                    "years":0
                },
                {
                    "name":"Hazmat",
                    "have":false,
                    "years":0
                },
                {
                    "name":"Refrigerated Loads",
                    "have":false,
                    "years":0
                },
                {
                    "name":"Van",
                    "have":false,
                    "years":0
                },
                {
                    "name":"Car Carrier",
                    "have":false,
                    "years":0
                },
                {
                    "name":"Flat Bed",
                    "have":false,
                    "years":0
                }
            ];
            let newUser = {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                dln : user.dln,
                experience: expDefault,
                job: user.job,
                typeUser: 1,
                photo: 'https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png'
            }
        
            try {
                const newStaff = await store.addStaff(newUser);
                if(newStaff.status == 201){
                    const url = config.baseurl + '/new_user?token=' + newStaff.message.user.token;
                    mailer(
                        user.email, 
                        'Invitation to MYCDL Driver', 
                        `Hello ${user.name} ${user.lastname}! We welcome you to MyCDL Driver.`,
                        `${company.tradename} wants you to be part of their Drivers Staff, all you need to do is complete you information.
                        Here <a href='${url}'>${url}</a> you can do it in two simple steps. 
                        <p>Have a great at day , My CDL Driver Team.</p>`);
                }
                return newStaff;
            } catch (e) {
                return {
                    status: 500,
                    message: 'Unexpected error',
                    detail: e
                }
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
    checkDriver,
    addStaff
}