import axios from 'axios';


const types = {
    FETCH_JOBS: 'FETCH_JOBS',
    VISIBLE_MODAL_LOGIN: 'VISIBLE_MODAL_LOGIN',
    DEVICETYPE:'DEVICETYPE'
}

const initialState = {
    jobs: [],
    citys_available:[],
    visible_modal_login:false,
    deviceType: 'desktop'
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

const handlerModalLogin = (props) => {
    return {
        type: types.VISIBLE_MODAL_LOGIN,
        payload: props
    }
}

const deviceType = (props) => {
    return {
        type: types.DEVICETYPE,
        payload: props
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
        case types.VISIBLE_MODAL_LOGIN:
            return { 
                ...state, visible_modal_login:action.payload
             }
        case types.DEVICETYPE:
            return { 
                ...state, visible_modal_login:action.payload
             }
        default:
          return state;
    }
}

export {
    types,
    landingReducer,
    fetchJobPositionData,
    handlerModalLogin,
    deviceType
};