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
  message,
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
  imageDln: [],
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
      isUseSucces: state.user.typeUser
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
  LOGIN_SUCCCESS: 'LOGIN_SUCCCESS'
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
    case types.UPLOAD_IMAGE:
      return { ...state, imageDln:action.payload }
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

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const propsUpload = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: 'authorization-text'
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      
      if(state.imageDln.length > 0){
        try{
          const file = {
            foto: state.imageDln[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        }catch(e){
          console.log(e);
        }
      }
      dispatch({ type: types.UPLOAD_IMAGE, payload: fileList});
    }
  };

  const handleDatePicker = (obj, date, key) => {
    let data = state.driver;
    if (date === "") data[key] = moment(new Date()).format('MM DD YYYY')
    else data[key] = date;
    dispatch({ type: types.DATA_DRIVER, payload: data });
  }

  const newDrivers = async () => {
    const { base, driver } = state;
    if(state.imageDln.length > 0){
      driver.imageDln = state.imageDln[0].response.data.file;
    }
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
    if(state.imageDln.length > 0){
      state.driver.imageDln = state.imageDln[0].response.data.file;
    }
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
    imageDln: state.imageDln,
    onChangeBase: onChangeBase,
    onChangeDriver: onChangeDriver,
    handleDatePicker: handleDatePicker,
    newDrivers: newDrivers,
    updateDriver: updateDriver,
    beforeUpload,
    propsUpload
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
            {
                !props.isUseSucces ? <Link href="/userProfile">
                  <Button shape="round" size="large" icon={<LeftOutlined />} type='primary'> Go Back </Button>
                </Link> : null
              }
              <FormUserDriver {...formConfig} />
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverProfileView));