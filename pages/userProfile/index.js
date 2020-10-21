import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../components/layout';
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
import DriverUser from './components/driverUser';
import CompanyUser from './components/companyUser';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  typeUser: 0,
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
    expDateDln: moment(new Date()).format('MM DD YYYY'),
    birthDate: moment(new Date()).format('MM DD YYYY'),
    areaCode: '',
    phoneNumber: '',
    experience: '',
    sex: '',
    address: '',
    zipCode: '',
    description: ''
  },
  company: {
      tradename:'',
      legalNumber:'',
      address: '',
      description:'',
      areaCode:'',
      phoneNumber:'',
      zipCode: ''
  }
}

const types = {
  CREATE_NEW_USER: 'create_new_user',
  SELECT_USER_TYPE:'select_user_type',
  PROPS_BASE:'props_base',
  DATA_DRIVER: 'DATA_DRIVER',
  DATA_COMPANY: 'DATA_COMPANY'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.PROPS_BASE:
      return { ...state, base: action.payload }
    case types.DATA_DRIVER:
      return { ...state, driver: action.payload }
    case types.DATA_COMPANY:
      return { ...state, company: action.payload }
    case types.SELECT_USER_TYPE:
      return { ...state, typeUser: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const UserProfile = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    verifyUserType(user.typeUser)
  }, []);

  const verifyUserType = (typeUser) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: typeUser })
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

    if(user.typeUser == 1){
      let driver = state.driver;
      driver.dln = user.driver.dln;
      if(user.driver.expDateDln)
        driver.expDateDln = user.driver.expDateDln || '';
      if(user.driver.birthDate)
        driver.birthDate = user.driver.birthDate || '';
      driver.areaCode = user.driver.areaCode;
      driver.phoneNumber = user.driver.phoneNumber;
      driver.experience = user.driver.experience;
      driver.sex = user.driver.sex;
      driver.address = user.driver.address;
      driver.zipCode = user.driver.zipCode;
      driver.description = user.driver.description;
    }else if(user.typeUser == 2){
      let company = state.company;
      company.tradename = user.company.tradename;
      company.legalNumber = user.company.legalNumber;
      company.areaCode = user.company.areaCode;
      company.phoneNumber = user.company.phoneNumber;
      company.logo = user.company.logo;
      company.address = user.company.address;
      company.description = user.company.description;
      company.zipCode = user.company.zipCode;
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

    if(key == 'experience'){
      value = e;
    }else{
      value = e.target.value;
    }
    driver[key] = value;
    dispatch({ type: types.DATA_DRIVER, payload: driver });
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
    if(date === "") data[key] = moment(new Date()).format('MM DD YYYY')
    else data[key] = date;
    dispatch({ type: types.DATA_DRIVER, payload: data });
  }

  const resolveUserType = () => {
    state.base.typeUser = state.typeUser;
    switch(state.typeUser){
      case 1:
        return <DriverUser 
        base={state.base}
        driver={state.driver}
        onChangeBase={onChangeBase}
        onChangeDriver={onChangeDriver}
        handleDatePicker={handleDatePicker} 
        newDrivers={newDrivers}
        updateDriver={updateDriver}
        />
      case 2:
        return <CompanyUser
        base={state.base}
        company={state.company}
        onChangeBase={onChangeBase}
        onChangeCompany={onChangeCompany}
        newCompany={newCompany}
        updateCompany={updateCompany}
        />
      default:
        return <WrapperSection row={24} mt={0}>
        <div className="profile-driver__route">
          <div className="title">
            <Title>  Let's do this!  </Title>
            <Text strong>Are you a driver or a company?</Text>
          </div>
          <div className="card-container">
            <Card
              hoverable={true}
              onClick={() => selectUserType(1)}>
              <img src='/static/images/driver.svg' />
              <Text > Drivers </Text>
            </Card>
            <Card
              hoverable={true}
              onClick={() => selectUserType(2)}>
              <img src='/static/images/truck.svg' />
              <Text > Company </Text>
            </Card>
          </div>
        </div>
    </WrapperSection>
    }
  };

  const selectUserType = (typeUser) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: typeUser })
  }
  
  const newDrivers = async () => {
    const { base } = state;
    const {dln,expDateDln,birthDate,areaCode,phoneNumber,sex,experience,address,zipCode,description} = state.driver;
    const fullDriver = {
      base: base,
      dln: dln,
      expDateDln: expDateDln,
      birthDate: birthDate,
      areaCode: areaCode,
      phoneNumber: phoneNumber,
      sex: sex,
      experience: experience,
      address: address,
      zipCode: zipCode,
      description: description
    };
    console.log('[fullDriver]', fullDriver);
    try {
      const { data } = await axios.post('/api/driver', fullDriver);
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
    const {dln,expDateDln,birthDate,areaCode,phoneNumber,sex,experience,address,zipCode,description} = state.driver;
    const fullDriver = {
      base: base,
      dln: dln,
      expDateDln: expDateDln,
      birthDate: birthDate,
      areaCode: areaCode,
      phoneNumber: phoneNumber,
      sex: sex,
      experience: experience,
      address: address,
      zipCode: zipCode,
      description: description
    };
    try {
      const { data } = await axios.patch('/api/driver/' + user._id, fullDriver, header);
      user.name = fullDriver.base.name;
      user.lastname = fullDriver.base.lastname;
      user.driver.birthDate = fullDriver.birthDate;
      user.driver.dln = fullDriver.dln;
      user.driver.expDateDln = fullDriver.expDateDln;
      user.driver.areaCode = fullDriver.areaCode;
      user.driver.phoneNumber = fullDriver.phoneNumber;
      user.driver.experience = fullDriver.experience;
      user.driver.sex = fullDriver.sex;
      user.driver.address = fullDriver.address;
      user.driver.zipCode = fullDriver.zipCode;
      user.driver.description = fullDriver.description;
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

  const newCompany = async () => {
    const { base } = state;
    const {tradename,legalNumber,areaCode,phoneNumber,logo,address,zipCode,description} = state.company;
    base.typeUser = 2;
    const fullCompany = {
      base: base,
      tradename: tradename,
      legalNumber: legalNumber,
      areaCode: areaCode,
      phoneNumber: phoneNumber,
      logo: logo,
      address: address,
      zipCode: zipCode,
      description: description
    };
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
    const { base } = state;
    const {tradename,legalNumber,areaCode,phoneNumber,logo,address,zipCode,description} = state.company;
    base.typeUser = 2;
    const fullCompany = {
      base: base,
      tradename: tradename,
      legalNumber: legalNumber,
      areaCode: areaCode,
      phoneNumber: phoneNumber,
      logo: logo,
      address: address,
      zipCode: zipCode,
      description: description
    };
    try {
      const { data } = await axios.patch('/api/company/' + user._id, fullCompany, header);
      user.name = fullCompany.base.name;
      user.lastname = fullCompany.base.lastname;
      user.company.tradename = fullCompany.tradename;
      user.company.legalNumber = fullCompany.legalNumber;
      user.company.areaCode = fullCompany.areaCode;
      user.company.phoneNumber = fullCompany.phoneNumber;
      user.company.address = fullCompany.address;
      user.company.zipCode = fullCompany.zipCode;
      user.company.description = fullCompany.description;
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

  return (
    <MainLayout title='Profile' user={user}>
      <WrapperSection row={24} mt={0}>
        {resolveUserType(state.typeUser)}
      </WrapperSection>
    </MainLayout>
  )
};


const WrapperSection = ({ children, row, marginTop, marginBottom }) => {
  return (
    <div style={{ 
      background: `url('/static/images/bg-routes.jpg')`,
      marginTop: marginTop, 
      marginBottom: marginBottom,
      backgroundSize:'contain',
      }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}


export default UserProfile;