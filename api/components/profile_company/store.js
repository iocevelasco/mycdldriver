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

async function updateCompany(id, user){
    let company = user.company;
    const foundUser = await userModel.findOne({
        _id: id
    });
    const foundCompany = await Model.findOne({
        _id: foundUser.company
    });

    if(user.name){
        foundUser.name = user.name;
    }
    if(user.lastname){
        foundUser.lastname = user.lastname;
    }
    if(user.photo){
        try {
            fs.unlinkSync("." + foundUser.photo);
        } catch(err) {
            console.error(err);
        }
        foundUser.photo = user.photo;
    }

    if(company.tradename){
        foundCompany.dln = company.dln;
    }
    if(company.logo){
        try {
            fs.unlinkSync("." + foundCompany.logo);
        } catch(err) {
            console.error(err);
        }
        foundCompany.logo = company.logo;
    }
    if(company.legalNumber){
        foundCompany.legalNumber = company.legalNumber;
    }
    if(company.logo){
        foundCompany.logo = company.logo;
    }
    if(company.areaCode){
        foundCompany.areaCode = company.areaCode;
    }
    if(company.phoneNumber){
        foundCompany.phoneNumber = company.phoneNumber;
    }
    if(company.address){
        foundCompany.address = company.address;
    }
    if(company.description){
        foundCompany.description = company.description;
    }
    if(company.zipCode){
        foundCompany.zipCode = company.zipCode;
    }
    
    await foundUser.save();
    await foundCompany.save();
    return true;
}

module.exports = {
    list: getCompany,
    add: addCompany,
    update: updateCompany
}
