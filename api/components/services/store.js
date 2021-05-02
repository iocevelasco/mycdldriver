const Services = require('./model');

async function getServices(companyId) {
  try {
    let query = {};
    if (companyId) {
      query = {
        company: companyId
      }
    }

    const result = await Services.find(query)
      .populate("company", "_id name lastname typeUser photo email company")
      .populate("city", "_id cityName")
      .populate("state", "_id stateName");
    return { status: 200, message: result }
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function getService(serviceId) {
  try {
    if (!serviceId) {
      return {
        status: 400,
        message: 'No service id recived'
      };
    }
    const query = {
      _id: serviceId
    }

    const result = await Services.findOne(query).populate("company")
      .populate("city", "_id cityName")
      .populate("state", "_id stateName");;
    return { status: 200, message: result }
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function setService(service, company) {

  try {
    if (!service) {
      return {
        status: 400,
        message: 'No service recived'
      };
    }
    if (!company) {
      return {
        status: 400,
        message: 'No company recived'
      };
    }
    service.company = company._id;
    const serviceModel = new Services(service)
    const serviceResult = await serviceModel.save();

    return { status: 201, message: serviceResult };
  } catch (e) {
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function updateService(service) {
  try {
    const foundService = await Services.findOne({
      _id: service.id
    });

    if (service.title) {
      foundService.title = service.title;
    }
    if (service.detail) {
      foundService.detail = service.detail;
    }
    if (service.image) {
      if (foundService.image != service.image) {
        foundService.image = service.image;
      }
    }
    if (service.email) {
      foundService.email = service.email;
    }
    if (service.phone) {
      foundService.phone = service.phone;
    }
    if (service.whatsapp) {
      foundService.whatsapp = service.whatsapp;
    }
    if (service.includeService) {
      foundService.includeService = service.includeService;
    }
    if (service.state) {
      foundService.state = service.state;
    }
    if (service.city) {
      foundService.city = service.city;
    }
    console.log('Service Before', foundService);
    const serviceResult = await foundService.save();
    return { status: 200, message: serviceResult };

  } catch (e) {
    console.log('Error Update Service', e)
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function deleteService(id) {
  if (!id) {
    return {
      status: 400,
      message: 'No service id recived'
    };
  }

  try {
    await Services.findOneAndDelete({ _id: id });
    return { status: 200, message: 'The service has been deleted correctly' }
  } catch (e) {
    return {
      status: 500,
      message: 'Unexpected error',
      detail: e
    };
  }
}

module.exports = {
  getServices,
  getService,
  setService,
  updateService,
  deleteService
}