import axios from 'axios';

const types = {
    FETCH_JOBS: 'FETCH_JOBS',
    FETCH_DRIVERS: 'FETCH_DRIVERS',
    FETCH_SERVICES: 'FETCH_SERVICES',
    VISIBLE_MODAL_LOGIN: 'VISIBLE_MODAL_LOGIN',
    DEVICETYPE: 'DEVICETYPE',
    IS_LOADING: 'IS_LOADING',
    COMMON_DATA: 'COMMON_DATA',
}

const initialState = {
    jobs: [],
    drivers: [],
    citys: [],
    services: [],
    jobs_name: [],
    companies: [],
    visible_modal_login: false,
    deviceType: 'desktop',
    isLoading: true
}

function fetchJobPositionData(qs) {
    return (dispatch) => {
        return axios.get(`/api/company/jobs?${qs}`)
            .then(({ data }) => {
                let jobs = data.data;
                dispatch(({
                    type: types.FETCH_JOBS,
                    payload: {
                        jobs: jobs,
                    }
                }));
            }).catch((error) => {
                console.log(error);
            })
    }
}

function fetchServices() {
    return (dispatch) => {
        return axios.get(`/api/services/home`)
            .then(({ data }) => {
                let services = data.data;
                dispatch(({
                    type: types.FETCH_SERVICES,
                    payload: services
                }));
            }).catch((error) => {
                console.log(error);
            })
    }
}

function fetchDriversData() {
    return (dispatch) => {
        return axios.get(`/api/user/1`)
            .then(({ data }) => {
                let drivers = data.data;
                dispatch(({
                    type: types.FETCH_DRIVERS,
                    payload: drivers
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
                let jobs_name = data.data.title.map(e => {
                    return { value: e }
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
                citys_available: action.payload.citys_available,
                isLoading: false
            }
        case types.FETCH_SERVICES:
            return {
                ...state, services: action.payload
            }
        case types.FETCH_DRIVERS:
            return {
                ...state, drivers: action.payload
            }
        case types.VISIBLE_MODAL_LOGIN:
            return {
                ...state, visible_modal_login: action.payload
            }
        case types.DEVICETYPE:
            return {
                ...state, deviceType: action.payload
            }
        case types.IS_LOADING:
            return {
                ...state, isLoading: action.payload
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
    fetchCommonData,
    fetchDriversData,
    fetchServices
};