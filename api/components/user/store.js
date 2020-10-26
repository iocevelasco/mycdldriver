const Model = require('./model');
const driverModel = require('../profile_driver/model');
const companyModel = require('../profile_company/model');
const fs = require('fs');

async function getUser(filterUser){
    let filter = {};
    if(filterUser !== null){
        filter = {
            name: filterUser,
        };
    }
    const list = await Model.find(filter);
    return list;
}

async function deleteUser(id){
    const foundUser = await Model.findOne({
        _id: id
    });
    const foundDriver = await driverModel.findOne({
        _id: foundUser.driver
    });
    const foundCompany = await companyModel.findOne({
        _id: foundUser.company
    });

    try {
        if(foundUser.photo){
            fs.unlinkSync("." + foundUser.photo);
        }
        if(foundDriver.imageCdl){
            fs.unlinkSync("." + foundUser.imageCdl);
        }
        if(foundCompany.logo){
            fs.unlinkSync("." + foundCompany.logo);
        }
    } catch(err) {
        console.error(err);
    }

    try {
        await driverModel.deleteOne({
            _id: foundDriver._id
        }); 
    } catch(err) {
        console.error(err);
    }

    try {
        await companyModel.deleteOne({
            _id: foundCompany._id
        }); 
    } catch(err) {
        console.error(err);
    }
        
    return Model.deleteOne({
        _id: id
    });    

}

async function loginUser(mail, pass){
    try {
        const user = await Model.findByCredentials(mail, pass);
        const {_id, name, lastname, photo, email, date} = user;
        const token = await user.generateAuthToken();
        return { _id, name, lastname, photo, email, date, token };
    }catch(error){
        console.log(error);
        return false;
    }
}

async function loginProviderUser(provider, mail, type){
    try {
        const user = await Model.findOne({email: mail})
        .select("-__v")
        .populate('driver', "-_id -__v")
        .populate('company', "-_id -__v");

        switch (type) {
            case 1:
                if(!user.google_id){
                    user.google_id = provider;
                    await user.save();
                }else if(user.google_id != provider){
                    return false;
                }
                break;
            case 2: 
                if(!user.facebook_id){
                    user.facebook_id = provider;
                    await user.save();
                }else if(user.facebook_id != provider){
                    return false;
                }
                break;
        };
        const token = await user.generateAuthToken();
        const login = {
            "_id": user._id,
            "name": user.name,
            "lastname": user.lastname,
            "typeUser": user.typeUser,
            "photo": user.photo,
            "email": user.email,
            "google_id": user.google_id,
            "facebook_id": user.facebook_id,
            "date": user.date,
            "token": token,
            "driver": user.driver,
            "company": user.company
        }
        return login;
        
    }catch(error){
        console.log("[ USER STORE ] error: " + error);
        return false;
    }
}

async function logoutUser(id, tokenUser){
    const foundUser = await Model.findOne({
        _id: id
    });
    foundUser.tokens = foundUser.tokens.filter((token) => {
        return token.token != tokenUser;
    });
    await foundUser.save();
}

async function logoutAll(id){
    const foundUser = await Model.findOne({
        _id: id
    });
    foundUser.tokens.splice(0, foundUser.tokens.length);
    await foundUser.save();
}

module.exports = {
    list: getUser,
    delete: deleteUser,
    login: loginUser,
    logout: logoutUser,
    logoutAll,
    loginProviderUser
}