const Incident = require('./model');

async function setIncident(incident, company) {

  try {
    if (!incident) {
      return {
        status: 400,
        message: 'No incident recived'
      };
    }
    if (!company) {
      return {
        status: 400,
        message: 'No company recived'
      };
    }
    incident.company = company._id;
    const incidentModel = new Incident(incident)
    const incidentResult = await incidentModel.save();

    return { status: 201, message: incidentResult };
  } catch (e) {
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function getIncident(driverId) {
  try {
    if (!driverId) {
      return {
        status: 400,
        message: 'No driver id recived'
      };
    }
    const query = {
      driver: driverId
    }

    const result = await Incident.find(query).populate("company")
    return { status: 200, message: result }
  } catch (e) {
    return {
      status: 500,
      message: 'Unexpected error',
      detail: e
    };
  }
}

async function deleteIncident(id) {
  if(!id){
    return {
      status: 400,
      message: 'No incident id recived'
    };
  }

  try{
    await Incident.findOneAndDelete({_id: id});
    return { status: 200, message: 'The incident has been deleted correctly' }
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