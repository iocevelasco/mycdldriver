import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Form,
  Button,
  Card
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import DriverUser from './components/driverUser';
import CompanyUser from './components/companyUser';
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
    sex: '',
    google_id: '',
    facebook_id: ''
  },
  driver: {
    dln: '',
    expDateDln: '',
    birthDate: '',
    areaCode: '',
    phoneNumber: '',
    sex: '',
    experience: '',
    address: '',
    zipCode: '',
    description: ''
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
  SELECT_USER_TYPE: 'select_user_type',
  PROPS_BASE: 'props_base',
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
  const [form] = Form.useForm();
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

    dispatch({ type: types.PROPS_BASE, payload: base })
  }, [user, state.typeUser]);

  const onChangeBase = (e, key, type) => {
    let base = state.base;
    let value = "";
    switch (type) {
      case 1:
        if (key == 'experience') {
          value = e;
        } else {
          value = e.target.value;
        }
        base[key] = value;
        break;
      case 2:
        value = e.target.value;
        base[key] = value;
        break;
      default:
        value = e.target.value;
        base[key] = value;
        break;
    };
    dispatch({ type: types.DATA_DRIVER, payload: base });
  }

  const onChangeCompany = (e, key, type) => {
    let driver = state.driver;
    let value = "";
    switch (type) {
      case 1:
        if (key == 'experience') {
          value = e;
        } else {
          value = e.target.value;
        }
        driver[key] = value;
        break;
      case 2:
        value = e.target.value;
        driver[key] = value;
        break;
      default:
        value = e.target.value;
        driver[key] = value;
        break;
    };
    dispatch({ type: types.DATA_DRIVER, payload: driver });
  }
  const onChangeDriver = (e, key, type) => {
    let driver = state.driver;
    let value = "";
    switch (type) {
      case 1:
        if (key == 'experience') {
          value = e;
        } else {
          value = e.target.value;
        }
        driver[key] = value;
        break;
      case 2:
        value = e.target.value;
        driver[key] = value;
        break;
      default:
        value = e.target.value;
        driver[key] = value;
        break;
    };
    dispatch({ type: types.DATA_DRIVER, payload: driver });
  }

  const handleDatePicker = (obj, date, key) => {
    let data = state.typeUser ? state.driver : state.company;
    data[key] = date;
    if (state.typeUser) dispatch({ type: types.DATA_DRIVER, payload: data });
    else dispatch({ type: types.DATA_COMPANY, payload: data });
  }

  const ResolveUserType = () => {
    console.log('typeUser', user.typeUser);
    switch (user.typeUser) {
      case 1:
        return <DriverUser
          driver={state.driver}
          base={state.base}
          onChangeBase={onChangeBase}
          onChangeDriver={onChangeDriver}
          handleDatePicker={handleDatePicker}
          newDrivers={newDrivers}
        />
      case 2:
        return <CompanyUser
          base={state.base}
          onChangeBase={onChangeBase}
          company={state.company}
          onChangeCompany={onChangeCompany}
          handleDatePicker={handleDatePicker}
          newDrivers={newDrivers}
        />
      default:
        return <DriverUser
          driver={state.driver}
          base={state.base}
          onChangeBase={onChangeBase}
          onChangeDriver={onChangeDriver}
          handleDatePicker={handleDatePicker}
          newDrivers={newDrivers}
        />
    }
  };

  const selectUserType = (typeUser) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: typeUser })
  }


  const newDrivers = async () => {
    const { base } = state;
    const { dln, expDateDln, birthDate, areaCode, phoneNumber, sex, experience, address, zipCode, description } = state.driver;
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
      const { data } = await axios.post('/api/driver', fullDriver);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const cardConfig = {
    hoverable:true
  }

  return (
    <MainLayout title='Profile' user={user}>
      <WrapperSection row={24} mt={0}>
        {
          state.typeUser ? (
            <ResolveUserType
              onChangeInputs={onChangeInputs}
              handleDatePicker={handleDatePicker}
              userType={user.typeUser}
              newDrivers={newDrivers} />
          ) : (
              <WrapperSection row={24} mt={0}>
                <div className="profile-driver__route">
                  <div className="title">
                    <Title> Addres </Title>
                    <Text strong > lorem ipsum asdasd asdasdasd </Text>
                  </div>
                  <div className="card-container">
                    <Card
                      {...cardConfig}
                      onClick={() => selectUserType(1)}>
                      <img src='/static/images/driver.svg' />
                      <Text > Drivers </Text>
                    </Card>
                    <Card
                      {...cardConfig}
                      onClick={() => selectUserType(2)}>
                      <img src='/static/images/truck.svg' />
                      <Text > Company </Text>
                    </Card>
                  </div>
                </div>
              </WrapperSection>
            )
        }
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