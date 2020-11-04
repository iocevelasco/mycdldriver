const types = {
    USER_DATA:'USER_DATA',
    UPDATE_USER_DATA:'UPDATE_USER_DATA',
    LOGIN_SUCCESS:'LOGIN_SUCCESS',
    LOGOUT_SUCCESS:'LOGOUT_SUCCESS'
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

const updateUserProps = (props) => {
    console.log('props', props);
    return {
      type: UPDATE_USER_DATA,
      payload: props
    }
}

const getInitialPropsUser = (props) => {
    return {
        type: UPDATE_USER_DATA,
        payload: props
      }
}

const userReducer  = (state = initialState, action) =>{
    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {...state, ...action.payload, isLogin:true}
        case types.UPDATE_USER_DATA:
            console.log('payload', action.payload)
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export {
    types,
    userReducer,
    updateUserProps,
    getInitialPropsUser
} ;