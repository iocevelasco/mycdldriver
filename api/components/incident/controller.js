const store = require('./store');

function getIncident() {
  return new Promise((resolve, reject) => {
    const result = store.getIncident();
    switch (result.status) {
      case 200:
        resolve(result);
        break;
      default:
        reject(result);
        break;
    }
  });
}

function setIncident(incident, company) {
  return new Promise((resolve, reject) => {
    const result = store.setIncident(incident, company);
    switch (result.status) {
      case 201:
        resolve(result);
        break;
      default:
        reject(result);
        break;
    }
  });
}

async function deleteIncident(id){
  try{
    const result = await store.deleteIncident(id);
    return result;
  }catch(e){
    return {
      status: 500,
      message: 'Unexpected error',
      detail: e
    };
  }
  
  
}

module.exports = {
  getIncident,
  setIncident,
  deleteIncident
}