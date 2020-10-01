const store = require('./store');
const config = require('../../config');

function getCompany(filter){
    return new Promise((resolve, reject) => {
        resolve(store.list(filter));
    });
}

function addCompany(company, user){
    return new Promise((resolve, reject) => {
        if(!company){
            console.error('[companyController] No driver data');
            reject('[companyController] No driver data');
            return false;
        }
        if(!user){
            console.error('[companyController] No user data');
            reject('[companyController] No user data');
            return false;
        }
        const fullCompany = {
            tradename: company.tradename,
            legalNumber: company.legalNumber,
            address: company.address,
            description: company.description,
            user: user
        };

        const companyResolve = store.add(fullCompany); 
        resolve(companyResolve);
    });
    
}

module.exports = {
    getCompany,
    addCompany
}