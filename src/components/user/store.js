const Model = require('./model');

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
    const {name, email, password} = myUser;
    const token = await myUser.generateAuthToken();
    return { name, email, password, token };
}

async function updateUser(id, user){
    const foundUser = await Model.findOne({
        _id: id
    });

    if(user.name){
        foundUser.name = user.name;
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

function deleteUser(id){
    return Model.deleteOne({
        _id: id
    });

}

async function loginUser(mail, pass){
    try {
        const user = await Model.findByCredentials(mail, pass);
        const {name, email, password} = user;
        const token = await user.generateAuthToken();
        console.log("Consiguio algo");
        return { name, email, password, token };
    }catch(error){
        console.log(error);
        return error;
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