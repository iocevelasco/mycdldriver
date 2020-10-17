import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Form,
  Button,
  Switch,
  InputNumber,
  Radio,
  DatePicker,
  message
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
  PROPS_BASE:'props_base'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.PROPS_BASE:
      return { ...state, base: action.payload }
    case types.CREATE_NEW_USER:
      return { ...state, driver: action.payload }
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

  const onChangeInputs = (e, key, type) => {
    let user = state;
    console.log(user);
    let value = "";
    switch (type){
      case 1:
        if(key == 'experience'){
          value = e;
        }else{
          value = e.target.value;
        }
        user.driver[key] = value;
        break;
      case 2:
        value = e.target.value;
        user.company[key] = value;
        break;
      default:
        value = e.target.value;
        user.base[key] = value;
        break;
    };
    dispatch({ type: types.CREATE_NEW_USER, payload: user });
  }

  const handleDatePicker = (obj, date, key) => {
    let user = state ;
    console.log(user);
    user.driver[key] = date;
    dispatch({ type: types.CREATE_NEW_USER, payload: user });
  }

  const ResolveUserType = ({newDrivers, onChangeInputs, handleDatePicker}) => {
    console.log('typeUser', user.typeUser);
    switch(user.typeUser){
      case 1:
        return <DriverUser 
        driver={state.driver}
        base={state.base}
        onChangeInputs={onChangeInputs}
        handleDatePicker={handleDatePicker} 
        newDrivers={newDrivers}
        />
      case 2:
        return <CompanyUser
        base={state.base}
        company={state.company}
        onChangeInputs={onChangeInputs}
        handleDatePicker={handleDatePicker}
        newDrivers={newDrivers}
        />
        default:
          return <DriverUser 
          driver={state.driver}
          base={state.base}
          onChangeInputs={onChangeInputs}
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
      const { data } = await axios.post('/api/driver', fullDriver);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <MainLayout title='Profile' user={user}>
      <WrapperSection row={24} mt={0}>
        {
          state.typeUser ? (
           <ResolveUserType
            onChangeInputs={onChangeInputs}
            handleDatePicker={handleDatePicker}
            userType={user.typeUser}
            newDrivers={newDrivers}/> 
          ):( 
            <WrapperSection row={24} mt={0}>
                <Button onClick={()=>selectUserType(2)}> Empresa </Button>
                <Button onClick={()=>selectUserType(1)}> Chofer </Button>
            </WrapperSection>
          )
        }
      </WrapperSection>
    </MainLayout>
  )
};


const WrapperSection = ({ children, row, marginTop, marginBottom }) => {
  return (
    <div style={{marginTop:marginTop, marginBottom:marginBottom}}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}



export default UserProfile;