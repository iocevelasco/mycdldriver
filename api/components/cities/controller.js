const store = require('./store');


function getStates() {
    return new Promise((resolve, reject) => {
        const result = store.getStates();
        switch (result.status) {
            case 200:
                resolve(result);
                break;
            case 400:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

function getCities(idState) {
    return new Promise((resolve, reject) => {
        const result = store.getCities(idState);
        switch (result.status) {
            case 200:
                resolve(result);
                break;
            case 400:
                reject(result);
                break;
            case 404:
                reject(result);
                break;
            default:
                resolve(result);
                break;
        }
    });
}

module.exports = {
    getStates,
    getCities
}