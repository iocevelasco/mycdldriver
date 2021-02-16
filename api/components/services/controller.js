const store = require('./store');

async function getService(serviceId) {
    try{
        const result = await store.getService(serviceId);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function getServices(companyId) {
    try{
        let id = 0;
        if (companyId) {
            id = companyId;
        }
        const result = await store.getServices(id);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function setService(service, company) {
    try{
        const result = await store.setService(service, company);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function updateService(service) {
    try{
        const result = store.updateService(service);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function deleteService(id) {
    try{
        const result = store.deleteService(id);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

module.exports = {
    getService,
    getServices,
    setService,
    updateService,
    deleteService
}