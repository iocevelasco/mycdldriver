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



module.exports = {
    list: getUser
}