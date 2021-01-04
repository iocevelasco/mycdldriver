const {User, Prelogin} = require('./model');
const driverModel = require('../profile_driver/model');
const companyModel = require('../profile_company/model');
const fs = require('fs');

async function getUser(type){
    let filter = {};
    if(type !== null){
        filter = {
            typeUser: type,
        };
    }
    try{
        const list = await User.find(filter)
        .select('name lastname photo date email')
        .populate('driver')
        .populate({
            path: 'company',
            model: 'ProfileCompany',
            populate: [{
                path: 'state',
                select: 'stateName'
            },
            {
                path: 'city',
                select: 'cityName'
            }]
        });
        return {
            status: 200,
            message: list
        };
    }catch(e){
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
    
}

async function getOneUser(id){
    let filter = {};
    if(id !== null){
        filter = {
            _id: id,
        };
    }
    try{
        const list = await User.findOne(filter)
        .select('name lastname photo date email')
        .populate('driver')
        .populate('company');
        return {
            status: 200,
            message: list
        };
    }catch(e){
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
    
}

async function setPrelogin(data){
    let prelogin = new Prelogin(data);
    const userlogin = await Prelogin.findOneAndUpdate(
        {ip: prelogin.ip},
        {
            ip: prelogin.ip,
            ruta: prelogin.ruta,
            abspath: prelogin.abspath
        },
        {upsert: true, new: true, rawResult: true}
    ); 
    console.log(userlogin);
    return userlogin;
}

async function getPrelogin(ip){
    let filter = {};
    if(ip !== null){
        filter = {
            ip: ip,
        };
    }else{
        return false;
    }
    const result = await Prelogin.findOne(filter);
    return result;
}

async function deleteUser(id){
    const foundUser = await User.findOne({
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
        
    return User.deleteOne({
        _id: id
    });    

}

async function updatePhoto(id, photo){
    const foundUser = await User.findOne({
        _id: id
    });
    if(photo){
        try {
            fs.unlinkSync("." + foundUser.photo);
        } catch(err) {
            console.error(err);
        }
        foundUser.photo = photo;
    }
    
    await foundUser.save();
    return true;
}

async function loginUser(mail, pass){
    try {
        const user = await User.findByCredentials(mail, pass);
        const {_id, name, lastname, photo, email, date, typeUser, driver, company} = user;
        const token = await user.generateAuthToken();
        return { _id, name, lastname, photo, email, date, typeUser, driver, company, token };
    }catch(error){
        return false;
    }
}

async function loginProviderUser(provider, mail, type){
    try {
        const user = await User.findOne({email: mail})
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

async function loginAfterRegUser(mail){
    try {
        const user = await User.findOne({email: mail})
        .select("-__v")
        .populate('driver', "-_id -__v")
        .populate('company', "-_id -__v");

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
    const foundUser = await User.findOne({
        _id: id
    });
    foundUser.tokens = foundUser.tokens.filter((token) => {
        return token.token != tokenUser;
    });
    await foundUser.save();
}

async function logoutAll(id){
    const foundUser = await User.findOne({
        _id: id
    });
    foundUser.tokens.splice(0, foundUser.tokens.length);
    await foundUser.save();
}

async function changePassword(user, newPass){
    try{
        const foundUser = await User.findOne({
            email: user.email
        });
        foundUser.password = newPass;
        foundUser.save();
        return {
            status: 200,
            message: 'Password changed successfully'
        };
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        };
    }
}

async function checkMail(mail){
    try{
        const user = await User.findOne({
            email: mail
        });
        const token = await user.generateAuthToken();
        if(user){
            return {
                status: 200,
                message: {user, token}
            };
        }else{
            return {
                status: 404,
                message: 'User not found'
            }
        }
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        };
    }
}

module.exports = {
    list: getUser,
    oneUser: getOneUser,
    delete: deleteUser,
    login: loginUser,
    logout: logoutUser,
    logoutAll,
    loginProviderUser,
    loginAfterRegUser,
    setPrelogin,
    getPrelogin,
    updatePhoto,
    changePassword,
    checkMail
}