import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  notification,
  message,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import FormUserCompany from '../../components/FormUserCompany';
import SideNav from '../../components/SideNavAdmin';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateUserCompany } from '@store/reducers/user_reducer';
import { WrapperSection } from 'components/helpers';

const initialState = {
  loading:true,
  userLogin:false,
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
  company: {
    tradename: '',
    legalNumber: '',
    address: '',
    description: '',
    areaCode: '',
    phoneNumber: '',
    zipCode: ''
  }
}

const types = {
  CREATE_NEW_USER: 'create_new_user',
  PROPS_BASE: 'props_base',
  PROPS_COMPANY: 'props_company',
  LOADING: 'LOADING',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  LOGIN_SUCCCESS: 'LOGIN_SUCCCESS'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.PROPS_BASE:
      return { ...state, base: action.payload, loading:false }
    case types.DATA_COMPANY:
      return { ...state, company: action.payload }
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.LOGIN_SUCCCESS:
      return { ...state, userLogin: action.payload }
    case types.UPLOAD_IMAGE:
      return { ...state, logo:action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

// CONNECT WITH REDUX
function mapStateToProps(state){
  return {
      user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return {
    handlreNewUserProps: (newProps) => dispatch(updateUserCompany(newProps)),
  }
};


const CompanyProfileView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const configSection = {
    title:'Profile',
    user:{user},
    loading:state.loading,
  }

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
    dispatch({ type: types.PROPS_BASE, payload: base });
    if (user.typeUser) {
      dispatch({ type: types.DATA_COMPANY, payload: user.company })
    }
    dispatch({ type: types.LOADING, payload: false });
  }, [user]);


  const onChangeBase = (e, key) => {
    let base = state.base;
    let value = "";

    value = e.target.value;
    base[key] = value;

    dispatch({ type: types.PROPS_BASE, payload: base });
  }

  const onChangeCompany = (e, key) => {
    let company = state.company;
    let value = "";

    value = e.target.value;
    company[key] = value;

    dispatch({ type: types.DATA_COMPANY, payload: company });
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
      
      if(state.logo.length > 0){
        try{
          const file = {
            foto: state.logo[0].response.data.file
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

  const newCompany = async () => {
    const { base, company } = state;
    base.typeUser = 2;
    if(state.logo.length > 0){
      company.logo = state.logo[0].response.data.file;
    }
    const fullCompany = { base: base, ...company }
    dispatch({ type: types.LOADING, payload: true });
    try {
      const { data } = await axios.post('/api/company', fullCompany);
      dispatch({ type: types.LOADING, payload: false });
      props.handlreNewUserProps(data.data);
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      dispatch({ type: types.LOADING, payload: false });
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! An error occurred while saving changes! Please try again."
      });
    }
  };

  const updateCompany = async () => {
    const header = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { base, company } = state;
    base.typeUser = 2;
    if(state.logo.length > 0){
      company.logo = state.logo[0].response.data.file;
    }
    const fullCompany = { base: base, ...company }
    try {
      dispatch({ type: types.LOADING, payload: true });
      await axios.patch('/api/company/' + user._id, fullCompany, header);
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.LOADING, payload: false });
      notification['error']({
        message: 'error',
        description:
          "Sorry! An error occurred while saving changes! Please try again."
      });
    }
  };
  const formConfig = {
    base: state.base,
    company: state.company,
    logo: state.logo,
    onChangeBase,
    onChangeCompany,
    handleDatePicker,
    newCompany,
    updateCompany,
    beforeUpload,
    propsUpload
  }

  const styleWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundSize: 'contain',
  }

  return (
    <MainLayout {...configSection}>
      <Row display='flex' justify='center'>
       <SideNav currentLocation='1' />
        <Col span={20}>
          <WrapperSection row={24} styles={styleWrapper}>
            <FormUserCompany {...formConfig} />
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyProfileView));


