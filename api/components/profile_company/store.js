const Model = require('./model');
const userModel = require('../user/model');

function getCompany(filterCompany){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterCompany !== null){
            filter = {
                legalNumber: filterCompany,
            };
        }
        result = Model.find(filter);

        resolve(result);
    });
}

async function addCompany(user){
    const company = new Model(user.company);
    await company.save();
    user.company = company;
    const myUser = new userModel(user);
    await myUser.save();
    const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = myUser;
    const token = await myUser.generateAuthToken();
    user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date, token };
    return {user, company};
}

module.exports = {
    list: getCompany,
    add: addCompany
}
