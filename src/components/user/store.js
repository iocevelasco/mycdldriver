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
    const token = await myUser.generateAuthToken();
    return { myUser, token };
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



module.exports = {
    list: getUser,
    add: addUser,
    update: updateUser,
    delete: deleteUser
}