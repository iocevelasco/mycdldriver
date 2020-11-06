import axios from 'axios';


const types = {
    FETCH_JOBS: 'FETCH_JOBS',
}

const initialState = {
    jobs: [],
    citys_available:[]
}

function fetchJobPositionData(qs) {
    return (dispatch) => {
        return axios.get(`/api/company/jobs?${qs}`)
            .then(({ data }) => {
            
            let jobs = data.data;
            let citys = _.uniqBy(jobs, 'city').map(e =>  e.city);
                
                dispatch(({
                    type: types.FETCH_JOBS,
                    payload: {
                        jobs : jobs,
                        citys_available : citys,
                    }
                }));
            }).catch((error) => {
                console.log(error);
            })
    }
}


const landingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS:
            return { 
                ...state, 
                jobs: action.payload.jobs,
                citys_available: action.payload.citys_available
             }
        default:
            return state;
    }
}

export {
    types,
    landingReducer,
    fetchJobPositionData,
};