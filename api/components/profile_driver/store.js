const Model = require('./model');
const {User} = require('../user/model');
const {JobsModel, JobsApplysModel} = require('../company_jobs/model');
const fs = require('fs');

async function getDriver(filterDriver){
    return new Promise((resolve, reject) => {
        try{
            driverResult = Model.find()
            .populate('state')
            .populate('city');
    
            resolve({status: 200, message: driverResult});
        }catch(e){
            reject({
                status: 400,
                message: 'Driver list error',
                detail: e
            });
        }
        
    });
}

async function addDriver(user){
    const driver = new Model(user.driver);
    
    try{
        await driver.save();
        user.driver = driver;
        const myUser = new User(user);
        try{
            await myUser.save();
            const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = myUser;
            const token = await myUser.generateAuthToken();
            user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date, token };
            return {status: 201, message: {user, driver}};
        }catch(e){
            await Model.deleteOne({
                _id: driver._id
            });
            return {
                status: 400,
                message: 'User registration error',
                detail: e
            }
        }
    }catch(e){
        return {
            status: 400,
            message: 'Driver registration error',
            detail: e
        }
    }
    
}

async function updateDriver(id, user){
    let driver = user.driver;
    const foundUser = await User.findOne({
        _id: id
    });
    if(!foundUser){
        return {
            status: 404,
            message: 'User not found',
            detail: e
        }
    }
    const foundDriver = await Model.findOne({
        _id: foundUser.driver
    });
    if(!foundDriver){
        return {
            status: 404,
            message: 'Driver not found',
            detail: e
        }
    }

    if(user.name){
        foundUser.name = user.name;
    }
    if(user.lastname){
        foundUser.lastname = user.lastname;
    }
    if(user.password){
        foundUser.password = user.password;
    }
    if(user.photo){
        try {
            fs.unlinkSync("." + foundUser.photo);
        } catch(err) {
            console.error(err);
        }
        foundUser.photo = user.photo;
    }
    if(driver.birthDate){
        foundDriver.birthDate = driver.birthDate;
    }
    if(driver.areaCode){
        foundDriver.areaCode = driver.areaCode;
    }
    if(driver.phoneNumber){
        foundDriver.phoneNumber = driver.phoneNumber;
    }
    if(driver.sex){
        foundDriver.sex = driver.sex;
    }
    if(driver.zipCode){
        foundDriver.zipCode = driver.zipCode;
    }
    if(driver.address){
        foundDriver.address = driver.address;
    }
    if(driver.address2){
        foundDriver.address = driver.address2;
    }
    if(driver.city){
        foundDriver.city = driver.city;
    }
    if(driver.state){
        foundDriver.state = driver.state;
    }
    
    try{
        await foundUser.save();
        await foundDriver.save();
        const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = foundUser;
        user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date };
        return {
            status: 200,
            message: {user, foundDriver}
        }
    }catch(e){
        return {
            status: 400,
            message: 'Unexpected Error',
            detail: e
        }
    }
    
}

async function updateExperience(id, driver){
    const foundDriver = await Model.findOne({
        _id: id
    });
    if(!foundDriver){
        return {
            status: 404,
            message: 'Driver not found',
            detail: e
        }
    }

    if(driver.dln){
        foundDriver.dln = driver.dln;
    }
    if(driver.expDateDln){
        foundDriver.expDateDln = driver.expDateDln;
    }
    if(driver.imageDln){
        try {
            fs.unlinkSync("." + foundDriver.imageDln);
        } catch(err) {
            console.error(err);
        }
        foundDriver.imageDln = driver.imageDln;
    }
    if(driver.medicCardImage){
        try {
            fs.unlinkSync("." + foundDriver.medicCardImage);
        } catch(err) {
            console.error(err);
        }
        foundDriver.medicCardImage = driver.medicCardImage;
    }
    if(driver.description){
        foundDriver.description = driver.description;
    }
    if(driver.experience){
        foundDriver.experience = driver.experience;
    }

    foundDriver.twicCard = driver.twicCard;
    try {
        await foundDriver.save();
        return {
            status: 200,
            message: 'User experience updated'
        }
    }catch(e){
        console.log(e);
        return {
            status: 400,
            message: 'User experience error',
            detail: e
        }
    }
}

async function deleteDriver(id){
    const foundUser = await Model.findOne({
        _id: id
    });

    try {
        if(foundUser.imageCdl){
            fs.unlinkSync("." + foundUser.imageCdl);
        }
    } catch(err) {
        console.error(err);
    }
        
    return Model.deleteOne({
        _id: id
    });

}

async function checkDriver(mail){
    try{
        const user = await User.findOne({
            email: mail
        })
        .select('name lastname typeUser photo date email')
        .populate('driver')
        .populate('company');
        return user;
    }catch(e){
        return e;
    }
    
}

async function addStaff(user){
    let foundJob = "";
    const driver = new Model({
        dln: user.dln,
        experience: user.experience
    });
    try{
        foundJob = await JobsModel.findOne({ _id: user.job });
        if(!foundJob){
            return {
                status: 404,
                message: 'Job not found'
            }
        }
    }catch(e){
        return {
            status: 400,
            message: 'Error: find job error',
            detail: e
        }
    }
    
    try{
        await driver.save();
        user.driver = driver;
        const myUser = new User(user);
        try{
            await myUser.save();
            const {_id, name, lastname, typeUser, photo, email, date} = myUser;
            const token = await myUser.generateAuthToken();
            user = { _id, name, lastname, typeUser, photo, email, date, token };

            try{
                const applyJob = {
                    company: foundJob.company,
                    driver: myUser,
                    job: foundJob._id,
                    status: 1
                }
                const newApply = new JobsApplysModel(applyJob);
                await newApply.save();
                return {status: 201, message: {user, driver}};
            }catch(e){
                await Model.deleteOne({
                    _id: driver._id
                });
                await User.deleteOne({
                    _id: myUser._id
                });
                return {
                    status: 400,
                    message: 'Apply job error',
                    detail: e
                }
            }
        }catch(e){
            await Model.deleteOne({
                _id: driver._id
            });
            return {
                status: 400,
                message: 'User registration error',
                detail: e
            }
        }
    }catch(e){
        return {
            status: 400,
            message: 'Driver registration error',
            detail: e
        }
    }
    
}

module.exports = {
    list: getDriver,
    add: addDriver,
    update: updateDriver,
    delete: deleteDriver,
    experience: updateExperience,
    check: checkDriver,
    addStaff
}