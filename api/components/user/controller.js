const store = require('./store');
const config = require('../../config');
const mailer = require('../../middelware/mailer');

async function getUsers(filterUsers){
    try{
        const result = await store.list(filterUsers);
        return result;
    }catch(e){
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
        
}

async function getUser(id){
    try{
        const result = await store.oneUser(id);
        return result;
    }catch(e){
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
        
}

function setPhoto(id, photo){
    return new Promise((resolve, reject) => {
        resolve(store.updatePhoto(id, photo));
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

function loginAfterRegUser(email){
    return new Promise(async (resolve, reject) => {
        if(!email){
            reject('Invalid data');
            return false;
        }
        const result = await store.loginAfterRegUser(email);
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

function setPrelogin(ip, ruta, abspath){
    const data = {
        ip: ip,
        ruta: ruta,
        abspath: abspath
    }
    return new Promise(async (resolve, reject) => {
        if(!ip){
            reject('Invalid data');
            return false;
        }
        const result = await store.setPrelogin(data);
        resolve(result);
    });
}

function getPrelogin(ip){
    return new Promise((resolve, reject) => {
        resolve(store.getPrelogin(ip));
    });
}

async function changePassword(user, newPass){
    try{
        return store.changePassword(user, newPass);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

async function checkMail(mail){
    if(!mail){
        return {
            status: 400,
            message: 'No email recived'
        }
    }

    try{
        respuesta = await store.checkMail(mail);
        switch(respuesta.status){
            case 200:
                const port = config.port ? ':' + config.port : '';
                const url = config.host + port + '/recover_password?token=' + respuesta.message.token;
                mailer(
                    mail, 
                    'Password recovery in MYCDL Driver',
                    'Recover forgotten password', 
                    `This email has been sent because I request a forgotten password recovery, if you have not requested this email just ignore the message.<br />
                    To generate a new password, just follow the link below and access the password change screen.<br />
                    <a href='${url}'>${url}</a>
                    <p>Have a great at day , My CDL Driver Team.</p>`);
                return {
                    status: 200,
                    message: 'Mail sent successfully'
                };
                break;
            default:
                return respuesta;
                break;
        }
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAll,
    addUserDirect,
    loginProviderUser,
    loginAfterRegUser,
    setPrelogin,
    getPrelogin,
    setPhoto,
    changePassword,
    checkMail
}