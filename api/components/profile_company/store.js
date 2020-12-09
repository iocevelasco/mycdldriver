const Model = require('./model');
const {User} = require('../user/model');

function getCompany(filterCompany){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterCompany !== null){
            filter = {
                legalNumber: filterCompany,
            };
        }
        result = Model.find(filter)
        .populate('state')
        .populate('city');

        resolve(result);
    });
}

async function addCompany(user){
    const company = new Model(user.company);
    try{
        await company.save();
        user.company = company;
        const myUser = new User(user);
        try{
            await myUser.save();
            const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = myUser;
            const token = await myUser.generateAuthToken();
            user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date, token };
            return {status: 200, user, company};
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
    const foundCompany = await Model.findOne({
        _id: foundUser.company
    });

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
        try {
            fs.unlinkSync("." + foundUser.photo);
        } catch(err) {
            console.error(err);
        }
        foundUser.photo = user.photo;
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
    
    await foundUser.save();
    await foundCompany.save();
    const {_id, name, lastname, typeUser, photo, google_id, facebook_id, email, date} = foundUser;
    user = { _id, name, lastname, typeUser, photo, google_id, facebook_id, email, date };
    return {user, foundCompany};
}

module.exports = {
    list: getCompany,
    add: addCompany,
    update: updateCompany
}
