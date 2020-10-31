import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../../../components/layout';
import {
  Row,
  Col,
  notification
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import FormUserCompany from '../../components/FormUserCompany';
import SideNav from '../../components/SideNavAdmin';
import LoadingComp from '../../../../components/loading';
import { withRouter } from 'next/router';

const initialState = {
  loading:true,
  userLogin:false,
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
    default:
      throw new Error('Unexpected action');
  }
}

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
      let company = user.company;
      dispatch({ type: types.DATA_COMPANY, payload: company })
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

  const handleDatePicker = (obj, date, key) => {
    let data = state.driver;
    if (date === "") data[key] = moment(new Date()).format('MM DD YYYY')
    else data[key] = date;
    dispatch({ type: types.DATA_DRIVER, payload: data });
  }

  const newCompany = async () => {
    const { base, company } = state;
    base.typeUser = 2;
    const fullCompany = { base: base, ...company }
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.post('/api/company', fullCompany);
      dispatch({ type: types.LOADING, payload: false });
      dispatch({ type: types.LOGIN_SUCCCESS, payload: true });
      window.location.reload(false);
      props.router.push('/userProfile/company/profile');
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    }
  };

  const updateCompany = async () => {
    const header = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { base, company } = state;
    base.typeUser = 2;
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
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    }
  };
  const formConfig = {
    base: state.base,
    company: state.company,
    onChangeBase,
    onChangeCompany,
    handleDatePicker,
    newCompany,
    updateCompany,
  }

  return (
    <MainLayout {...configSection}>
      <Row>
       <SideNav typeUser={user.typeUser} currentLocation='1' />
        <Col span={user.typeUser? 20 : 24}>
          {state.loading && <LoadingComp/>}
          <WrapperSection row={24} mt={0}>
            <FormUserCompany {...formConfig} />
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


export default withRouter(CompanyProfileView);