const store = require('./store');
const config = require('../../config');

function getCompany(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addCompany(company, logo){
    return new Promise((resolve, reject) => {
        if(!company){
            console.error('[companyController] No company data');
            reject('[companyController] No company data');
            return false;
        }
        const fileUrl = logo ? config.publicRoute + config.filesRoute + '/' + logo.filename : '';

        const fullCompany = {
            tradename: company.tradename,
            legalNumber: company.legalNumber,
            areaCode: company.areaCode,
            phoneNumber: company.phoneNumber,
            logo: fileUrl,
            address: company.address,
            description: company.description,
            zipCode: company.zipCode
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
    deleteCompany
}