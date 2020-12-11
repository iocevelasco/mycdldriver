const Model = require('./model');
const {User} = require('../user/model');
const fs = require('fs');

async function getDriver(filterDriver){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterDriver !== null){
            filter = {
                dln: filterDriver,
            };
        }
        driverResult = Model.find(filter)
        .populate('state')
        .populate('city');

        resolve(driverResult);
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
            return {status: 200, user, driver};
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
    const foundDriver = await Model.findOne({
        _id: foundUser.driver
    });

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

    if(driver.dln){
        foundDriver.dln = driver.dln;
    }
    if(driver.birthDate){
        foundDriver.birthDate = driver.birthDate;
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
    if(driver.areaCode){
        foundDriver.areaCode = driver.areaCode;
    }
    if(driver.phoneNumber){
        foundDriver.phoneNumber = driver.phoneNumber;
    }
    if(driver.sex){
        foundDriver.sex = driver.sex;
    }
    if(driver.experience){
        foundDriver.experience = driver.experience;
    }
    if(driver.zipCode){
        foundDriver.zipCode = driver.zipCode;
    }
    if(driver.description){
        foundDriver.description = driver.description;
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
    
    await foundUser.save();
    await foundDriver.save();
    const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = foundUser;
    user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date };
    return {user, foundDriver};
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

module.exports = {
    list: getDriver,
    add: addDriver,
    update: updateDriver,
    delete: deleteDriver
}