const store = require('./store');
const config = require('../../config');

function getCompany(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addCompany(company){
    return new Promise((resolve, reject) => {
        if(!company){
            console.error('[companyController.addCompany] No company data');
            reject('[companyController.addCompany] No company data');
            return false;
        }

        const fullCompany = {
            tradename: company.tradename,
            legalNumber: company.legalNumber,
            areaCode: company.areaCode,
            phoneNumber: company.phoneNumber,
            address: company.address,
            address2: company.address2,
            description: company.description,
            city: company.city,
            state: company.state,
            zipCode: company.zipCode,
            logo: company.logo
        };

        const user = {
            name: company.base.name,
            lastname: company.base.lastname,
            typeUser: company.base.typeUser,
            photo: company.base.photo,
            email: company.base.email,
            password: company.password,
            google_id: company.base.google_id,
            facebook_id: company.base.facebook_id,
            company: fullCompany
        };

        const companyResolve = store.add(user); 
        switch(companyResolve.status){
            case 200:
                resolve(companyResolve);
                break;
            case 500:
                reject(companyResolve);
                break;
            case 400:
                reject(companyResolve);
                break;
            default:
                resolve(companyResolve);
                break;
        }
    });
    
}

function updateCompany(id, company){
    console.log('[ CONTROLLER UPDATE COMPANY ]', company);
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('[companyController.updateCompany] No user ID');
            return false;
        }
        if(!company){
            reject('[companyController.updateCompany] No user data');
            return false;
        }

        const fullCompany = {
            tradename: company.tradename,
            legalNumber: company.legalNumber,
            areaCode: company.areaCode,
            phoneNumber: company.phoneNumber,
            address: company.address,
            address2: company.address2,
            description: company.description,
            city: company.city,
            state: company.state,
            zipCode: company.zipCode,
            logo: company.logo
        };

        const user = {
            name: company.base.name,
            lastname: company.base.lastname,
            photo: company.base.photo,
            password: company.password,
            company: fullCompany
        };
        console.log('[ CONTROLLER OBJECT COMPANY ]', user);
        
        const result = await store.update(id, user);
        resolve(result);
    });
}

function deleteCompany(id){
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
    getCompany,
    addCompany,
    updateCompany,
    deleteCompany
}