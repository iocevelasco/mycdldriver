import React, { useState, useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Spin,
  Card,
  Button,
  notification
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import FormUserDriver from '../../components/FormUserDriver';
import SideNav from '../../components/SideNavAdmin';
import { LeftOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { WrapperSection } from 'components/helpers';
import { updateUserDrive } from '../../../../store/reducers/user_reducer';
import Link from 'next/link';

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

function mapStateToProps(state){
  return {
      user: state.user, 
      userCreated:state.user.isLogin
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
};

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

  const newDrivers = async () => {
    const { base, driver } = state;
    const fullDriver = { base: base, ...driver };

    try {
      dispatch({ type: types.LOADING, payload: true });
      const { data } = await axios.post('/api/driver', fullDriver);
      props.handleNewDriverProps(data.data);
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      dispatch({ type: types.LOADING, payload: false });
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't create this user, please try again. "
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
      await axios.patch('/api/driver/' + user._id, fullDriver, header);
      //dispatch({ type: types.LOADING, payload: false });
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      dispatch({ type: types.LOADING, payload: false });
      console.log('loader false 2', state.loading);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save the information correctly , please try again."
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

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24, 
    paddingBottom: 24,
    backgroundSize:'contain',
  }
  
    return (
      <MainLayout title='Profile' user={user} loading={state.loading}>
        <Row display='flex' justify='center'>
          <SideNav /> 
          <Col span={20}>
            <WrapperSection styles={stylesWrapper} row={24} mt={0}>
              <Link href="/userProfile">
                <Button shape="round" size="large" icon={<LeftOutlined />} type='primary'> Go Back </Button>
              </Link>
              <FormUserDriver {...formConfig} />
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverProfileView));