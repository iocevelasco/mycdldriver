import moment from 'moment';

const types = {
    USER_DATA: 'USER_DATA',
    UPDATE_USER_COMPANY: 'UPDATE_USER_COMPANY',
    UPDATE_USER_DRIVER: 'UPDATE_USER_DRIVER',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_USER: 'LOGOUT_USER',
    GET_CURRENT_LOCATION: 'GET_CURRENT_LOCATION',
    HANDLE_INPUTS_BASE: 'HANDLE_INPUTS_BASE',
    HANDLE_INPUTS_DRIVER: 'HANDLE_INPUTS_DRIVER',
    HANDLER_PICKERS: 'HANDLER_PICKERS',
    HANDLE_INPUTS: 'HANDLE_INPUTS'
}

const initialState = {
    _id: '',
    name: '',
    lastname: '',
    typeUser: 0,
    isLogin: false,
    photo: '',
    email: '',
    google_id: '',
    facebook_id: '',
    date: '',
    fields: [],
    token: null,
    base: {
        name: '',
        lastname: '',
        email: ''
    },
    driver: {
        dln: '',
        expDateDln: moment(),
        birthDate: moment(),
        areaCode: '',
        phoneNumber: '',
        experience: '',
        sex: '',
        address: '',
        zipCode: '',
        description: ''
    },
    company: null,
    currentLocation: ''
}

function getCurrentLocation(location) {
    return {
        type: types.GET_CURRENT_LOCATION,
        payload: location
    }
}


function onChangeProps(base, driver) {
    return (dispatch) => {
        dispatch({
            type: types.HANDLE_INPUTS,
            payload: {
                driver: driver,
                base: base
            }
        });
    }
}



function updateUserCompany(props) {
    let { user, company } = props;
    return {
        type: types.UPDATE_USER_COMPANY,
        payload: { ...user, company: company }
    }
}

function updateUserDrive(props) {
    let { user, driver } = props;
    return {
        type: types.UPDATE_USER_DRIVER,
        payload: { ...user, driver: driver }
    }
}

const logoutUser = () => {
    const state = {
        _id: '',
        name: '',
        lastname: '',
        typeUser: 0,
        isLogin: false,
        photo: '',
        email: '',
        google_id: '',
        facebook_id: '',
        date: '',
        token: null,
        driver: null,
        company: null,
        deviceType: 'desktop'
    }
    return {
        type: types.LOGOUT_USER,
        payload: state
    }
}

const getInitialPropsUser = (props) => {
    return {
        type: types.UPDATE_USER_DATA,
        payload: props
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            let fields = state.fields;
            for (let key in action.payload) {
                let inputs = {
                    name: [key],
                    value: action.payload[key]
                }
                fields.push(inputs)
            }
            return { ...state, fields: fields, ...action.payload }
        case types.UPDATE_USER_DRIVER:
            return { ...state, ...action.payload }
        case types.UPDATE_USER_COMPANY:
            return { ...state, ...action.payload }
        case types.LOGOUT_USER:
            return { ...state, ...action.payload }
        case types.DEVICETYPE:
            return { ...state, deviceType: action.payload }
        case types.GET_CURRENT_LOCATION:
            return { ...state, currentLocation: action.payload }
        case types.HANDLE_INPUTS:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export {
    types,
    userReducer,
    updateUserCompany,
    updateUserDrive,
    getInitialPropsUser,
    logoutUser,
    getCurrentLocation,
    onChangeProps
};