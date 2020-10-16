const Model = require('./model');
const driverModel = require('../profile_driver/model');
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

async function addUser(user){
    const myUser = new Model(user);
    await myUser.save();
    const {_id, typeUser, name, lastname, photo, email, provider_id, password, date} = myUser;
    const token = await myUser.generateAuthToken();
    return { _id, typeUser, name, lastname, photo, email, provider_id, password, date, token };
}

async function updateUser(id, user){
    const foundUser = await Model.findOne({
        _id: id
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
    if(user.email){
        foundUser.email = user.email;
    }
    if(user.password){
        foundUser.password = user.password;
    }
    

    const newUser = await foundUser.save();
    return newUser;
}

async function deleteUser(id){
    const foundUser = await Model.findOne({
        _id: id
    });
    const foundDriver = await driverModel.findOne({
        user: id
    });

    try {
        if(foundUser.photo){
            fs.unlinkSync("." + foundUser.photo);
        }
        if(foundDriver.imageCdl){
            fs.unlinkSync("." + foundUser.imageCdl);
        }
    } catch(err) {
        console.error(err);
    }

    try {
        driverModel.deleteOne({
            _id: foundDriver._id
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
        .populate('driver', "-_id -__v");

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
            "driver": user.driver
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
    add: addUser,
    update: updateUser,
    delete: deleteUser,
    login: loginUser,
    logout: logoutUser,
    logoutAll,
    loginProviderUser
}