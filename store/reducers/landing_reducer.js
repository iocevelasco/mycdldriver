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
};