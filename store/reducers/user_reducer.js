import moment from "moment";
import axios from 'axios';
import { activeLoading } from './landing_reducer';
const types = {
  USER_DATA: "USER_DATA",
  UPDATE_USER_COMPANY: "UPDATE_USER_COMPANY",
  UPDATE_USER_DRIVER: "UPDATE_USER_DRIVER",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_USER: "LOGOUT_USER",
  GET_CURRENT_LOCATION: "GET_CURRENT_LOCATION",
  HANDLE_INPUTS_BASE: "HANDLE_INPUTS_BASE",
  HANDLE_INPUTS_DRIVER: "HANDLE_INPUTS_DRIVER",
  HANDLER_PICKERS: "HANDLER_PICKERS",
  HANDLE_INPUTS: "HANDLE_INPUTS",
  LOGIN_SUCCESS_MODAL: "LOGIN_SUCCESS_MODAL",
  UPDATE_EXPERIENCE: "UPDATE_EXPERIENCE",
  RELOAD_PROPS_DRIVER: 'RELOAD_PROPS_DRIVER',
  RELOAD_PROPS_COMPANY: 'RELOAD_PROPS_COMPANY',
};

const initialState = {
  _id: "",
  name: "",
  lastname: "",
  typeUser: 0,
  isLogin: false,
  photo: "",
  email: "",
  google_id: "",
  facebook_id: "",
  date: "",
  token: null,
  company: null,
  currentLocation: "",
  driver: {
    dln: "",
    expDateDln: moment(),
    birthDate: moment(),
    areaCode: "",
    phoneNumber: "",
    experience: "",
    sex: "",
    address: "",
    zipCode: "",
    description: "",
  },
  company: {
    tradename: '',
    legalNumber: '',
    address: '',
    address2: '',
    description: '',
    areaCode: '',
    experience: '',
    phoneNumber: '',
    state: '',
    city: '',
  },
};

function fetchUserData(token, typeUser) {
  return (dispatch) => {
    return axios.post(`/api/user/me`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (typeUser == 1) {
          let { date, driver, lastname, name, _id, photo, email } = response.data.data;
          return dispatch(({
            type: types.RELOAD_PROPS_DRIVER,
            payload: {
              company: null,
              isLogin: true,
              token: token,
              typeUser: 1,
              date, driver, lastname, name, _id, photo, email
            }
          }));
        }

        if (typeUser == 2) {
          let { date, company, lastname, name, _id, photo, email } = response.data.data;
          return dispatch(({
            type: types.RELOAD_PROPS_COMPANY,
            payload: {
              driver: null,
              isLogin: true,
              typeUser: 2,
              token: token,
              date, company, lastname, name, _id, photo, email
            }
          }));
        }

      }).catch((error) => {
        console.log(error);
      });
  }
}

function getCurrentLocation(location) {
  return {
    type: types.GET_CURRENT_LOCATION,
    payload: location,
  };
}

function updateUserCompany(props) {
  let { user, company } = props;

  return {
    type: types.UPDATE_USER_COMPANY,
    payload: {
      ...user,
      company: company,
      isLogin: true,
      typeUser: 2,
    },
  };
}

function updateUserDrive(props) {
  let { user, driver } = props;
  return {
    type: types.UPDATE_USER_DRIVER,
    type: types.UPDATE_USER_COMPANY,
    payload: {
      ...user,
      driver: driver,
      isLogin: true,
      typeUser: 1,
    },
  };
};


const logoutUser = (router) => {
  const state = {
    _id: "",
    name: "",
    lastname: "",
    typeUser: 0,
    isLogin: false,
    photo: "",
    email: "",
    google_id: "",
    facebook_id: "",
    date: "",
    token: null,
    driver: {
      dln: "",
      expDateDln: moment(),
      birthDate: moment(),
      areaCode: "",
      phoneNumber: "",
      experience: "",
      sex: "",
      address: "",
      zipCode: "",
      description: "",
    },
    company: {
      tradename: '',
      legalNumber: '',
      address: '',
      address2: '',
      description: '',
      areaCode: '',
      experience: '',
      phoneNumber: '',
      state: '',
      city: '',
    },
    deviceType: "desktop",
  };
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('typeUser');
  router.push('/logout');
  return async (dispatch) => {
    await axios.get(`/logout`)
      .then(() => {
        return dispatch({
          type: types.LOGOUT_USER,
          payload: state,
        });
      })
  }
};

const getInitialPropsUser = (props) => {
  return {
    type: types.UPDATE_USER_DATA,
    payload: props,
  };
};

const setPropsUserReg = (props) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: props,
  };
};

const addExperience = (props) => {
  return {
    type: types.UPDATE_EXPERIENCE,
    payload: props,
  };
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case types.UPDATE_USER_DRIVER:
      return { ...state, ...action.payload };
    case types.UPDATE_USER_COMPANY:
      return { ...state, ...action.payload };
    case types.LOGOUT_USER:
      return { ...state, ...action.payload };
    case types.DEVICETYPE:
      return { ...state, deviceType: action.payload };
    case types.GET_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    case types.UPDATE_EXPERIENCE:
      return { ...state, experiencie: action.payload };
    case types.RELOAD_PROPS_DRIVER:
      return { ...state, ...action.payload, driver: action.payload.driver };
    case types.RELOAD_PROPS_COMPANY:
      return { ...state, ...action.payload, company: action.payload.company };
    default:
      return state;
  }
};

export {
  types,
  userReducer,
  updateUserCompany,
  updateUserDrive,
  getInitialPropsUser,
  logoutUser,
  getCurrentLocation,
  setPropsUserReg,
  addExperience,
  fetchUserData
};
