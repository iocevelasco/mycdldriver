import axios from 'axios';

const types = {
    FETCH_LANDING_DATA: 'FETCH_LANDING_DATA',
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


function fetchLandingData() {
    return (dispatch) => {
        function servicesList() {
            return axios.get('/api/services/home');
        }
        function jobsLits() {
            return axios.get('/api/company/jobs');
        }
        function driversList() {
            return axios.get('/api/user/1');
        }
        function fetchCommonData() {
            return axios.get(`/api/company/jobs/customlist`);
        }

        return Promise.all([servicesList(), jobsLits(), driversList(), fetchCommonData()])
            .then(function (results) {
                const services = results[0].data.data;
                const jobs = results[1].data.data;
                const drivers = results[2].data.data;
                const commont = results[3].data.data;
                console.log('results', services, jobs, drivers, commont)
                dispatch({
                    type: types.FETCH_LANDING_DATA,
                    payload: { jobs, drivers, commont, services }
                })
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
        case types.FETCH_LANDING_DATA:
            return {
                ...state, ...action.payload
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
    fetchLandingData
};