const store = require('./store');

function getIncident() {
  return new Promise((resolve, reject) => {
    const result = store.getIncident();
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

function setIncident(incident, company) {
  return new Promise((resolve, reject) => {
    const result = store.setIncident(incident, company);
    switch (result.status) {
      case 201:
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


module.exports = {
  getIncident,
  setIncident
}