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

async function setIncident(incident, company) {
  try{
    const result = await store.setIncident(incident, company);
    return result;
  }catch(e){
    return {
      status: 500,
      message: 'Unexpected controller error',
      detail: e
    };
  }
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