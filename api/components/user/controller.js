const store = require('./store');
const config = require('../../config');

function getUsers(filterUsers){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUsers));
    });
}

function addUserDirect(user){
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

function loginUser(user){
    return new Promise(async (resolve, reject) => {
        if(!user){
            reject('Invalid data');
            return false;
        }
        const { email, password } = user;
        const result = await store.login(email, password);
        if(result){
            resolve(result);
        }else{
            reject('Incorrect email or password');
        }
    });
}

function loginProviderUser(provider_id, email, type){
    return new Promise(async (resolve, reject) => {
        if(!provider_id){
            reject('Invalid data');
            return false;
        }
        if(!email){
            reject('Invalid data');
            return false;
        }
        const result = await store.loginProviderUser(provider_id, email, type);
        if(result){
            resolve(result);
        }else{
            reject('[ USER CONTROLLER ] Usuario no registrado');
        }
    });
}

function logoutUser(id, token){
    return new Promise(async (resolve, reject) => {
        if(!token){
            reject('Invalid data');
            return false;
        }
        const result = await store.logout(id, token);
        resolve(result);
    });
}

function logoutAll(id){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('Invalid data');
            return false;
        }
        const result = await store.logoutAll(id);
        resolve(result);
    });
}

module.exports = {
    getUsers,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAll,
    addUserDirect,
    loginProviderUser
}