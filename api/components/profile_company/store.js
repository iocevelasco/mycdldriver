const Model = require('./model');
const {User} = require('../user/model');
const fs = require('fs');

async function addCompany(user){
    if(!user){
        return {
            status: 404,
            message: 'No user data recived'
        }
    }
    if(!user.company){
        return {
            status: 404,
            message: 'No company data recived'
        }
    }
    const company = new Model(user.company);
    try{
        await company.save();
        user.company = company;
        const foundCompany = await Model.findOne({_id: company._id})
        .populate('state', 'stateName')
        .populate('city', 'cityName');
        const myUser = new User(user);
        try{
            await myUser.save();
            const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = myUser;
            const token = await myUser.generateAuthToken();
            user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date, token };
            return {status: 201, message: {user, company: foundCompany}};
        }catch(e){
            await Model.deleteOne({
                _id: company._id
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
            message: 'Company registration error',
            detail: e
        }
    }
    
}

async function updateCompany(id, user){
    let company = user.company;
    const foundUser = await User.findOne({
        _id: id
    });
    if(!foundUser){
        return {
            status: 404,
            message: 'User not found'
        }
    }
    const foundCompany = await Model.findOne({
        _id: foundUser.company
    })
    .populate('state', 'stateName')
    .populate('city', 'cityName');
    if(!foundCompany){
        return {
            status: 404,
            message: 'Company not found'
        }
    }

    if(user.name){
        foundUser.name = user.name;
    }
    if(user.lastname){
        foundUser.lastname = user.lastname;
    }
    if(user.password){
        foundUser.password = user.password;
    }
    if(company.tradename){
        foundCompany.tradename = company.tradename;
    }
    if(user.photo){
        if(user.photo != foundUser.photo){
            try {
                fs.unlinkSync("." + foundUser.photo);
            } catch(err) {}
            foundUser.photo = user.photo;
        }
    }
    if(company.legalNumber){
        foundCompany.legalNumber = company.legalNumber;
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
    if(company.address2){
        foundCompany.address2 = company.address2;
    }
    if(company.description){
        foundCompany.description = company.description;
    }
    if(company.zipCode){
        foundCompany.zipCode = company.zipCode;
    }
    if(company.city){
        foundCompany.city = company.city;
    }
    if(company.state){
        foundCompany.state = company.state;
    }
    
    try{
        await foundUser.save();
        await foundCompany.save();
        const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = foundUser;
        user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date };
        return {status: 200, message: {user, company: foundCompany}};
    }catch(e){
        return {
            status: 400,
            message: 'Error saving company',
            detail: e
        }
    }
    
}

module.exports = {
    add: addCompany,
    update: updateCompany
}
