import React, { useState, useEffect, useReducer } from 'react';
import MainLayout from '../../../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Spin,
  Card,
  notification
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import FormUserDriver from '../../components/FormUserDriver';
import SideNav from '../../components/SideNavAdmin';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  loading:false,
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
    expDateDln: '',
    birthDate: '',
    areaCode: '',
    phoneNumber: '',
    experience: '',
    sex: '',
    address: '',
    zipCode: '',
    description: ''
  },
}

const types = {
  PROPS_FULL: 'PROPS_FULL',
  PROPS_BASE: 'PROPS_BASE',
  DATA_DRIVER: 'DATA_DRIVER',
  LOADING: 'LOADING',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.PROPS_FULL:
      return {
        ...state,
        base: action.payload.base,
        driver: action.payload.company
      }
    case types.PROPS_BASE:
      return { ...state, base: action.payload }
      case types.DATA_DRIVER:
        return { ...state, driver: action.payload }
      case types.LOADING:
        return { ...state, loading: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const DriverProfileView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    //Esto carga las props iniciales
    let base = state.base;
    base.name = user.name || '';
    base.lastname = user.lastname || '';
    base.google_id = user.google_id || '';
    base.facebook_id = user.facebook_id || '';
    base.photo = user.photo || '';
    base.email = user.email || '';
    base.id = user._id || '';
    if (user.typeUser) {
      let driver = user.driver;

      dispatch({ type: types.DATA_DRIVER, payload: driver })
    }


    dispatch({ type: types.PROPS_BASE, payload: base })
  }, [user, state.typeUser]);

  const onChangeBase = (e, key) => {
    let base = state.base;
    let value = "";

    value = e.target.value;
    base[key] = value;

    dispatch({ type: types.PROPS_BASE, payload: base });
  }

  const onChangeDriver = (e, key) => {
    let driver = state.driver;
    let value = "";

    if (key == 'experience') {
      value = e;
    } else {
      value = e.target.value;
    }
    driver[key] = value;
    dispatch({ type: types.DATA_DRIVER, payload: driver });
  }

  const handleDatePicker = (obj, date, key) => {
    let data = state.driver;
    if (date === "") data[key] = moment(new Date()).format('MM DD YYYY')
    else data[key] = date;
    dispatch({ type: types.DATA_DRIVER, payload: data });
  }
  console.log('loading',state.loading);
  const newDrivers = async () => {
    const { base, driver } = state;
    const fullDriver = { base: base, ...driver };

    try {
      dispatch({ type: types.LOADING, payload: true });
      await axios.post('/api/driver', fullDriver);
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
      console.log(err);
    }
  };

  const updateDriver = async () => {
    const header = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { base } = state;
    const fullDriver = { base: base, ...state.driver };
    try { 
      dispatch({ type: types.LOADING, payload: true });
      console.log('loader activo', state.loading);
      await axios.patch('/api/driver/' + user._id, fullDriver, header);
      //dispatch({ type: types.LOADING, payload: false });
      dispatch({ type: types.LOADING, payload: false });
      console.log('loader false 1', state.loading);
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      //dispatch({ type: types.LOADING, payload: false });
      console.log('loader false 2', state.loading);
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
      console.log(err);
    }
  };

  const formConfig = {
    base: state.base,
    driver: state.driver,
    onChangeBase: onChangeBase,
    onChangeDriver: onChangeDriver,
    handleDatePicker: handleDatePicker,
    newDrivers: newDrivers,
    updateDriver: updateDriver,
  }
    return (
      <MainLayout title='Profile' user={user} loading={state.loading}>
        <Row>
          {
            user.typeUser ? <SideNav typeUser={user.typeUser} /> : null
          }
          <Col span={20}>
            <WrapperSection row={24} mt={0}>
              <FormUserDriver {...formConfig} />
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout>
    )
};

const WrapperSection = ({ children, row, marginTop, marginBottom }) => {
  return (
    <div style={{
      background: `url('/static/images/bg-routes.jpg')`,
      marginTop: marginTop,
      marginBottom: marginBottom,
      backgroundSize: 'contain',
    }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default DriverProfileView;