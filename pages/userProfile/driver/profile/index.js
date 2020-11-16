import React, { useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  Button,
  message,
  notification,
} from 'antd';
import axios from 'axios';
import FormUserDriver from 'components/FormUserDriver';
import SideNav from '../../components/SideNavAdmin';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { WrapperSection } from 'components/helpers';
import { 
  updateUserDrive, 
} from '@store/reducers/user_reducer';

const initialState = {
  loading:false,
  imageDln: [],
}

function mapStateToProps(state){
  const { user } = state;
  return {
    base:{
      name: user.name,
      lastname: user.lastname,
      photo: user.photo,
      email: user.email,
      typeUser: user.typeUser
    },
    driver: user.driver,
    isUserRegistry:state.user.typeUser,
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
};

const types = {
  LOADING: 'LOADING',
  LOGIN_SUCCCESS: 'LOGIN_SUCCCESS'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.UPLOAD_IMAGE:
      return { ...state, imageDln:action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const DriverProfileView = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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


  const newDrivers = async () => {
    const { base, driver } = props;
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
      const { data } = await axios.patch('/api/driver/' + user._id, fullDriver, header);
      props.handleNewDriverProps(data.data);
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
    imageDln: state.imageDln,
    newDrivers: newDrivers,
    updateDriver: updateDriver,
    action: !props.isUserRegistry ? <Button
    onClick={newDrivers}
    type='primary'
    block
    size='large'>Save Information</Button>
    : <Button
    onClick={updateDriver}
    type='primary'
    block
    size='large'>Update Information</Button>,
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
      <MainLayout title='Profile' loading={state.loading}>
        <Row display='flex' justify='center'>
          <SideNav currentLocation='0' /> 
          <Col span={20}>
            <WrapperSection styles={stylesWrapper} row={16} mt={0}>
              <FormUserDriver {...formConfig} />
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverProfileView));