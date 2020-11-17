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
    HANDLER_PICKERS:'HANDLER_PICKERS'
}

const initialState = {
    _id:'',
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

const getCurrentLocation = (location) => {
    return {
        type: types.GET_CURRENT_LOCATION,
        payload: location
    }
}

function onChangeDriver(e, key) {
    return (dispatch, getState) => {
        let driver = getState().user.driver;
        let value = "";
        if (key == 'experience') {
            value = e;
        } else {
            value = e.target.value;
        }
        driver[key] = value;
        dispatch({ type: types.HANDLE_INPUTS_DRIVER, payload: driver });
    }
}

function onChangeBase(e, key) {
    return (dispatch, getState) => {
        let user = getState().user;
        user[key] = e.target.value;
        dispatch({ type: types.HANDLE_INPUTS_BASE, payload: user });
    }
}

function handleDatePicker(obj, date, key) {
    return (dispatch, getState) => {
        let data = getState().user.driver;
        data[key] = date;
        dispatch({ type: types.HANDLER_PICKERS, payload: data });
    }
}

function updateUserCompany(props) {
    let { user, company } = props;
    return {
        type: types.UPDATE_USER_COMPANY,
        payload: { ...user, company: company }
    }
}

function updateUserDrive(props){
    let { user, driver } = props;
    return {
        type: types.UPDATE_USER_DRIVER,
        payload: { ...user, driver: driver }
    }
}

const logoutUser = () => {
    const state = {
        _id:'',
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
            return { ...state, ...action.payload }
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
        case types.HANDLE_INPUTS_BASE:
            return { ...state, ...action.payload }
        case types.HANDLE_INPUTS_DRIVER:
            return { ...state, ...action.payload }
        case types.HANDLER_PICKERS:
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
    onChangeDriver,
    onChangeBase,
    handleDatePicker
};