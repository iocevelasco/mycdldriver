const store = require('./store');
const config = require('../../config');

function getUsers(filterUsers){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUsers));
    });
}

function addUser(user, photo){
    return new Promise((resolve, reject) => {
        if(!user){
            console.error('[userController] No hay usuario');
            reject('Los datos son incorrectos');
            return false;
        }
        const fileUrl = photo ? config.publicRoute + config.filesRoute + '/' + photo.filename : '';
        user.photo = fileUrl;

        const fullUser = store.add(user); 
        resolve(fullUser);
        
    });
    
}

function updateUser(id, user, photo){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('No user ID');
            return false;
        }
        if(!user){
            reject('No user data');
            return false;
        }
        if(photo){
            const fileUrl = photo ? config.publicRoute + config.filesRoute + '/' + photo.filename : '';
            user.photo = fileUrl;
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
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAll
}