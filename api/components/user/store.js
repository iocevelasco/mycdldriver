const Model = require('./model');
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
    const {_id, name, lastname, photo, email, password, date} = myUser;
    const token = await myUser.generateAuthToken();
    return { _id, name, lastname, photo, email, password, date, token };
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

    try {
        if(foundUser.photo){
            fs.unlinkSync("." + foundUser.photo);
        }
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
    logoutAll
}