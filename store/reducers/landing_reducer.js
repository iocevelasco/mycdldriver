import axios from 'axios';


const types = {
    FETCH_JOBS: 'FETCH_JOBS',
    VISIBLE_MODAL_LOGIN: 'VISIBLE_MODAL_LOGIN',
    DEVICETYPE:'DEVICETYPE',
    IS_LOADING:'IS_LOADING',
    COMMON_DATA: 'COMMON_DATA',
}

const initialState = {
    jobs: [],
    citys:[],
    jobs_name:[],
    companies:[],
    visible_modal_login:false,
    deviceType: 'desktop',
    isLoading:false
}

function fetchJobPositionData(qs) {
    return (dispatch) => {
        return axios.get(`/api/company/jobs?${qs}`)
            .then(({ data }) => {
            
            let jobs = data.data;
                dispatch(({
                    type: types.FETCH_JOBS,
                    payload: {
                        jobs : jobs,
                    }
                }));
            }).catch((error) => {
                console.log(error);
            })
    }
}

function fetchCommonData() {
    return (dispatch) => {
        return axios.get(`/api/company/jobs/customlist`)
            .then(({ data }) => {
            let jobs_name = data.data.title.map(e=> {
                return {value:e}
            }) || [];                
            let citys = data.data.citys || [];                
            let companies = data.data.company || [];                
                dispatch(({
                    type: types.COMMON_DATA,
                    payload: {
                        jobs_name,
                        citys,
                        companies
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

const activeLoading = (props) => {
    return {
        type: types.IS_LOADING,
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
                ...state, deviceType:action.payload
             }
        case types.IS_LOADING:
            return { 
                ...state, isLoading:action.payload
             }
        case types.COMMON_DATA:
            return { 
                ...state, ...action.payload
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
    deviceType,
    activeLoading,
    fetchCommonData
};