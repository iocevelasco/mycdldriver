import axios from 'axios';
import moment from 'moment';

const types = {
  DRIVER_DATA:'DRIVER_DATA',
}

const initialState = {
  logo: [],
  base: {
    name: '',
    lastname: '',
    typeUser: '1',
    photo: '',
    email: '',
    google_id: '',
    facebook_id: ''
  },
  driver: {
    dln: '',
    expDateDln: moment(new Date).format('DD MM'),
    birthDate: moment(new Date).format('DD MM'),
    areaCode: '',
    phoneNumber: '',
    experience: '',
    sex: '',
    address: '',
    zipCode: '',
    description: ''
  },
}


const updateUserDrive = (props) => {
  let { user, driver } = props;
  return {
      type: types.UPDATE_USER_DRIVER,
      payload: {...user, driver:driver}
  }
}

const onChangeDriver = (e, key) => {
  let company = state.company;
  let value = "";

  value = e.target.value;
  company[key] = value;
  return { type: types.DATA_COMPANY, payload: company };
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
      deviceType: 'desktop'
  }
  return {
      type: types.LOGOUT_USER,
      payload: state
      }
}

const userDriverReducer  = (state = initialState, action) =>{
  switch(action.type){
      case types.DRIVER_DATA:
          return {...state, ...action.payload}
      default:
          return state;
  }
}

export {
  onChangeDriver,
  userDriverReducer,
} ;