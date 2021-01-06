const store = require('./store');
const config = require('../../config');
const mailer = require('../../middelware/mailer');

async function addCompany(company){

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
        zipCode: company.zipCode
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

    try{
        const companyResolve = await store.add(user); 
        try{
            if(companyResolve.status == 201){
                mailer(
                    user.email, 
                    'Welcome to MyCDL Driver!', 
                    `Your profile has been created , you can now start searching for your next driver.`,
                    `Tip: For a better experience , remember to maintain your profile up to date. 
                    <p>Have a great at day , My CDL Driver Team.</p>`);
            }
        }catch(e){
            console.log(e);
        }
        
        return companyResolve;
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

async function updateCompany(id, company){
    if(!id){
        return {
            status: 400,
            message: "No ID recived"
        };
    }
    if(!company){
        return {
            status: 400,
            message: "No Company recived"
        };
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

    try{
        const result = await store.update(id, user);
        return result;
    }catch(e){
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
}

module.exports = {
    addCompany,
    updateCompany
}