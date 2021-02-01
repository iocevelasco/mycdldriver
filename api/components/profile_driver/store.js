const Model = require('./model');
const userModel = require('../user/model');
const fs = require('fs');

async function getDriver(filterDriver){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterDriver !== null){
            filter = {
                dln: filterDriver,
            };
        }
        driverResult = Model.find(filter);

        resolve(driverResult);
    });
}

async function addDriver(user){
    const driver = new Model(user.driver);
    await driver.save();
    user.driver = driver;
    const myUser = new userModel(user);
    await myUser.save();
    const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = myUser;
    const token = await myUser.generateAuthToken();
    user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date, token };
    return {user, driver};
}

async function updateDriver(id, user){
    let driver = user.driver;
    const foundUser = await userModel.findOne({
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
    if(user.photo){
        try {
            if(foundUser.photo){
                if(fs.unlinkSync("." + foundUser.photo)){
                    foundUser.photo = user.photo;
                }
            }else{
                foundUser.photo = user.photo;
            }
            
        } catch(err) {
            console.error(err);
        }
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
            if(foundDriver.imageDln){
                if(fs.unlinkSync("." + foundDriver.imageDln)){
                    foundDriver.imageDln = driver.imageDln;
                }
            }else{
                foundDriver.imageDln = driver.imageDln;
            }
            
        } catch(err) {
            console.error(err);
        }
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
    
    await foundUser.save();
    await foundDriver.save();
    return true;
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