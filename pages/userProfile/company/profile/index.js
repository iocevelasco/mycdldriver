import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import { Row, Col, notification, message } from 'antd';
import axios from 'axios';
import FormUserCompany from 'components/FormUserCompany';
import SideNav from '../../components/SideNavAdmin';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateUserCompany } from '@store/reducers/user_reducer';
import { WrapperSection } from 'components/helpers';

const initialState = {
  loading: false,
  userLogin: false,
  fields: [],
  logo: [],
  photo: [],
  imageProfile: null,
}

const types = {
  CREATE_NEW_USER: 'create_new_user',
  PROPS_COMPANY: 'props_company',
  DATA_COMPANY: 'DATA_COMPANY',
  LOADING: 'LOADING',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  UPLOAD_PHOTO: 'UPLOAD_PHOTO',
  LOGIN_SUCCCESS: 'LOGIN_SUCCCESS',
  UPLOAD_IMAGE_PROFILE: 'UPLOAD_IMAGE_PROFILE'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.DATA_COMPANY:
      return { ...state, fields: action.payload }
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.LOGIN_SUCCCESS:
      return { ...state, userLogin: action.payload }
    case types.UPLOAD_IMAGE:
      return { ...state, logo: action.payload }
    case types.UPLOAD_PHOTO:
      return { ...state, photo: action.payload }
    case types.UPLOAD_PHOTO:
      return { ...state, photo: action.payload }
    case types.UPLOAD_IMAGE_PROFILE:
      return { ...state, imageProfile: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

// CONNECT WITH REDUX
function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photo: user.photo || '',
    _id: user._id || null,
    token: user.token || null,
    company: user.company || {},
    isUserRegistry: state.user.typeUser || null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlreNewUserProps: (newProps) => dispatch(updateUserCompany(newProps)),
  }
};

const CompanyProfileView = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };
  const configSection = {
    title: 'Profile',
    user: props.user,
    loading: state.loading,
  }

  useEffect(() => {
    let fields = [];

    for (let key in props.user) {
      let inputs = {
        name: [key],
        value: props.user[key]
      }
      fields.push(inputs)
    }

    for (let key in props.user.company) {
      if (key != 'date') {
        let inputs = {
          name: [key],
          value: props.user.company[key]
        }
        fields.push(inputs);
      }
    }
    dispatch({ type: types.DATA_COMPANY, payload: fields });
  }, []);

  const onChangeCompany = (allFields) => {
    dispatch({ type: types.DATA_COMPANY, payload: allFields });
  }

  const propsUpload = {
    name: 'photo',
    action: '/api/files',
    headers: {
      Authorization: `Bearer ${props.token}`
    },
    async onChange(info) {
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

      if (state.logo.length > 0) {
        try {
          const file = {
            foto: state.logo[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: types.UPLOAD_IMAGE, payload: fileList });
    }
  };

  const propsPhoto = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: `Bearer ${props.token}`
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

      if (state.photo.length > 0) {
        try {
          const file = {
            foto: state.photo[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: types.UPLOAD_IMAGE_PROFILE, payload: fileList[0].response });
      dispatch({ type: types.UPLOAD_PHOTO, payload: fileList });
    }
  };

  const beforeToCreateProfile = () => {
    let base = {}
    let company = {}
    state.fields.forEach((e) => {
      if (
        e.name[0] == 'name' ||
        e.name[0] == 'email' ||
        e.name[0] == 'lastname'
      ) {
        base[e.name[0]] = e.value
      }
      else {
        company[e.name[0]] = e.value
      }
    });
    return {
      base,
      company
    }
  }

  const newCompany = async () => {
    const { base, company } = beforeToCreateProfile();
    base.typeUser = 2;
    if (state.logo.length > 0) {
      company.logo = state.logo[0].response.data.file;
    }
    if (state.photo.length > 0) {
      base.photo = state.photo[0].response.data.file;
    } else {
      base.photo = props.photo;
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
          "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
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
    const { base, company } = beforeToCreateProfile();
    base.typeUser = 2;
    if (state.logo.length > 0) {
      company.logo = state.logo[0].response.data.file;
    }
    if (state.photo.length > 0) {
      base.photo = state.photo[0].response.data.file;
    }
    const fullCompany = { base: base, ...company };
    try {
      dispatch({ type: types.LOADING, payload: true });
      const { data } = await axios.patch('/api/company/' + props._id, fullCompany, header);

      let update = {
        user: data.data.user,
        company: data.data.foundCompany
      };

      props.handlreNewUserProps(update);
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
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
    logo: state.logo,
    photo: state.photo,
    fields: state.fields,
    imageProfile: state.imageProfile,
    onChangeCompany,
    newCompany,
    updateCompany,
    propsUpload,
    propsPhoto,
    loading: state.loading
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
        <SideNav currentLocation='0' />
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


