const store = require('./store');

function getUsers(filterUsers){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUsers));
    });
}

module.exports = {
    getUsers
}