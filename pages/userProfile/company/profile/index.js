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
import DrawerComponent from '../../components/SideNavAdmin';

const initialState = {
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
  PROPS_COMPANY: 'props_company'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.PROPS_BASE:
      return { ...state, base: action.payload }
    case types.DATA_COMPANY:
      return { ...state, company: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const CompanyView = ({ user, ...props }) => {
  console.log(user)
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
    dispatch({ type: types.PROPS_BASE, payload: base });
    if (user.typeUser) {
      let company = user.company;
      dispatch({ type: types.DATA_COMPANY, payload: company })
    }
  }, [user]);

  console.log(['state'], state);

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
    console.log('fullCompany', fullCompany);
    try {
      const { data } = await axios.post('/api/company', fullCompany);
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
      await axios.patch('/api/company/' + user._id, fullCompany, header);
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
    <MainLayout title='Profile' user={user}>
      <Row>
        <Col span={4}>
          <DrawerComponent />
        </Col>
        <Col span={20}>
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


export default CompanyView;