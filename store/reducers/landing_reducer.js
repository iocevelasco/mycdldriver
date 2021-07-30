import axios from 'axios';
import lodash from 'lodash';
const types = {
    FETCH_LANDING_DATA: 'FETCH_LANDING_DATA',
    FETCH_JOBS: 'FETCH_JOBS',
    VISIBLE_MODAL_LOGIN: 'VISIBLE_MODAL_LOGIN',
    DEVICETYPE: 'DEVICETYPE',
    IS_LOADING: 'IS_LOADING',
    COMMON_DATA: 'COMMON_DATA',
    FETCH_NEWS: 'FETCH_NEWS',
}

const initialState = {
    jobs: [],
    drivers: [],
    citys: [],
    services: [],
    jobs_name: [],
    companies: [],
    news: [],
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

function fetchNews() {
    return (dispatch) => {
        return axios.get('/api/blog')
        .then((response) => {
            const data = response.data.data;
            dispatch(({
                type: types.FETCH_NEWS,
                payload: {
                    news: data,
                }
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }
};

function fetchLandingData() {
    return (dispatch) => {
        return axios.get(`/api/home`)
            .then(({ data }) => {
                const { drivers, jobs, search, service } = data.data
                const { citys, company, title } = search;

                const jobs_name = lodash.uniqBy(title).map(e => {
                    return { value: e }
                });
                dispatch(({
                    type: types.FETCH_LANDING_DATA,
                    payload: {
                        drivers,
                        jobs,
                        services: service,
                        citys,
                        jobs_name,
                        companies: company
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
        case types.FETCH_LANDING_DATA:
            return {
                ...state, ...action.payload, isLoading: false
            }
        case types.FETCH_JOBS:
            return {
                ...state, ...action.payload
            }
        case types.FETCH_NEWS:
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
    fetchLandingData,
    fetchJobPositionData,
    handlerModalLogin,
    deviceType,
    activeLoading,
    fetchNews,
};