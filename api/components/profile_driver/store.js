const Model = require('./model');
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
    const myDriver = new Model(driver);
    await myDriver.save();
    return myDriver;
}

module.exports = {
    list: getDriver,
    add: addDriver
}