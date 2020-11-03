const types = {
    USER_DATA:'USER_DATA',
    UPDATE_USER_DATA:'UPDATE_USER_DATA',
}

const initialState = {
    name: '',
    lastname: '',
    typeUser: 0,
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
        case types.USER_DATA:
            return {...state, ...action.payload}
        case types.UPDATE_USER_DATA:
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