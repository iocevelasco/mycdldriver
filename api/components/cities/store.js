const {StatesModel, CitiesModel} = require('./model');

async function getStates(){
    try{
        const result = await StatesModel.find();
        return {status: 200, result};
    }catch(e){
        return {
            status: 400,
            message: 'State error',
            detail: e
        };
    }
}

async function getCities(idState){
    if(!idState){
        return {
            status: 400,
            message: 'No state recived'
        };
    }

    try{
        const query = {
            stateID: idState
        }
        const result = await CitiesModel.find(query);
        if(result){
            return {status: 200, result};
        }else{
            return {
                status: 404,
                message: 'No city found'
            }; 
        }
    }catch(e){
        return {
            status: 400,
            message: 'City error',
            detail: e
        };
    };
}

module.exports = {
    getStates,
    getCities
}