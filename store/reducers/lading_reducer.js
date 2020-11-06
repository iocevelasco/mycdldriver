import axios from 'axios';

const types = {
    FETCH_JOBS: 'FETCH_JOBS',
}

const initialState = {
    jobs: [],
}

function fetchJobPositionData(query) {
    return (dispatch) => {
        return axios.get('/api/company/jobs')
            .then(({ data }) => {
                dispatch(({
                    type: types.FETCH_JOBS,
                    payload: data.data
                }));
            }).catch((error) => {
                console.log(error);
            })
    }
}


const landingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS:
            return { ...state, jobs: action.payload }
        default:
            return state;
    }
}

export {
    types,
    landingReducer,
    fetchJobPositionData,
};