const Model = require('./model');

function getCompany(filterCompany){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterCompany !== null){
            filter = {
                legalNumber: filterCompany,
            };
        }
        Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if(error){
                reject(error);
                return false;
            }

            resolve(populated);
        });
    });
}

async function addCompany(company){
    const myCompany = new Model(company);
    await myCompany.save();
    return myCompany;
}

module.exports = {
    list: getCompany,
    add: addCompany
}
