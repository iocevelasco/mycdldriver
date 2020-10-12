const Model = require('./model');
const userModel = require('../user/model');
const fs = require('fs');

async function getDriver(filterDriver){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterDriver !== null){
            filter = {
                cdl: filterDriver,
            };
        }
        Model.find(filter)
        .select("rating address")
        .populate('user', "name lastname -_id")
        .exec((error, populated) => {
            if(error){
                reject(error);
                return false;
            } 
            const driverResult = [];
            populated.forEach(element => {
                driverResult.push({
                    "full_name" : element.user.name + " " + element.user.lastname,
                    "rating" : element.rating,
                    "address" : element.address
                });
            });

            resolve(driverResult);
        });
    });
}

async function addDriver(driver){
    const myUser = new userModel(driver.user);
    await myUser.save();
    const {_id, name, lastname, photo, email, date} = myUser;
    const token = await myUser.generateAuthToken();
    user = { _id, name, lastname, photo, email, date, token };
    driver.user = user;
    const myDriver = new Model(driver);
    await myDriver.save();
    return {myDriver, user};
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
    delete: deleteDriver
}