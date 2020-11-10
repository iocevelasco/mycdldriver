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
            logo: fileUrl,
            address: company.address,
            description: company.description,
            zipCode: company.zipCode,
            logo: company.logo
        };

        const user = {
            name: company.base.name,
            lastname: company.base.lastname,
            typeUser: company.base.typeUser,
            photo: company.base.photo,
            email: company.base.email,
            google_id: company.base.google_id,
            facebook_id: company.base.facebook_id,
            company: fullCompany
        };

        const companyResolve = store.add(user); 
        resolve(companyResolve);
    });
    
}

function updateCompany(id, company){
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
            description: company.description,
            zipCode: company.zipCode,
            logo: company.logo
        };

        const user = {
            name: company.base.name,
            lastname: company.base.lastname,
            photo: company.base.photo,
            company: fullCompany
        };
        
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