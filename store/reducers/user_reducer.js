const types = {
    USER_DATA:'USER_DATA',
    UPDATE_USER_COMPANY:'UPDATE_USER_COMPANY',
    UPDATE_USER_DRIVER:'UPDATE_USER_DRIVER',
    LOGIN_SUCCESS:'LOGIN_SUCCESS',
    LOGOUT_SUCCESS:'LOGOUT_SUCCESS',
    LOGOUT_USER:'LOGOUT_USER'
}

const initialState = {
    name: '',
    lastname: '',
    typeUser: 0,
    isLogin:false,
    photo:'',
    email: '',
    google_id: '',
    facebook_id: '',
    date:'',
    token:null,
    driver: null,
    company:null,
}

const updateUserCompany = (props) => {
    let { user, company } = props;
    return {
        type: types.UPDATE_USER_COMPANY,
        payload: {...user, company:company}
    }
}

const updateUserDrive = (props) => {
    let { user, driver } = props.data;
    return {
        type: types.UPDATE_USER_DRIVER,
        payload: {...user, ...driver}
    }
}

const logoutUser = () => {
    const state = {
        name: '',
        lastname: '',
        typeUser: 0,
        isLogin:false,
        photo:'',
        email: '',
        google_id: '',
        facebook_id: '',
        date:'',
        token:null,
        driver: null,
        company:null,
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

const userReducer  = (state = initialState, action) =>{
    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {...state, ...action.payload}
        case types.UPDATE_USER_DRIVER:
            return {...state, ...action.payload}
        case types.UPDATE_USER_COMPANY:
            return {...state, ...action.payload}
        case types.LOGOUT_USER:
            return {...state, ...action.payload}
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
    logoutUser
} ;