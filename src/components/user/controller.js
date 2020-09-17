const store = require('./store');

function getUsers(filterUsers){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUsers));
    });
}

function addUser(user){
    return new Promise((resolve, reject) => {
        if(!user){
            console.error('[userController] No hay usuario');
            reject('Los datos son incorrectos');
            return false;
        }

        const fullUser = store.add(user); 
        resolve(fullUser);
        
    });
    
}

function updateUser(id, user){
    return new Promise(async (resolve, reject) => {
        if(!id || !user){
            reject('Invalid data');
            return false;
        }
        const result = await store.update(id, user);
        resolve(result);
    });
}

function deleteUser(id){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('Invalid data');
            return false;
        }
        store.delete(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e); 
            });
    });
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}