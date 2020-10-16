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
  driver: {
    base: {
      name: '',
      lastname: '',
      typeUser: '1',
      photo: '',
      email: '',
      google_id: '',
      facebook_id: ''
    },
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
      base: {
          name: '',
          lastname: '',
          typeUser: '',
          photo:'',
          email: '',
          google_id:''
      },
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
  SELECT_USER_TYPE:'select_user_type'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.CREATE_NEW_USER:
      return { ...state, user: action.payload }
    case types.SELECT_USER_TYPE:
      return { ...state, typeUser: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const UserProfile = ({ user, ...props }) => {
  console.log('user', user);
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    verifyUserType(user.typeUser)
  }, []);

  const verifyUserType = (userType) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: userType })
  }

  useEffect(() => {
    if (!user) return;
    let user = state.driver;
    user.base.name = user.name || '';
    user.base.lastname = user.lastname || '';
    user.base.google_id = user.google_id || '';
    user.base.facebook_id = user.facebook_id || '';
    user.base.photo = user.photo || '';
    user.base.email = user.email || '';

    dispatch({ type: types.CREATE_NEW_USER, payload: user })
  }, [])

  const onChangeInputs = (e, key, base) => {
    let user = state.userType == 1 ? state.driver : state.company ;
    let value = "";
    switch (key) {
      case 'experience':
        value = e;
        user[key] = value;
        break;
      default:
        if (base) {
          value = e.target.value;
          user.base[key] = value;
        } else {
          value = e.target.value;
          user[key] = value;
        }
    }
    dispatch({ type: types.CREATE_NEW_USER, payload: user });
  }

  const handleDatePicker = (obj, date, key) => {
    let new_user = state.user;
    state.new_user[key] = date
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }

  const ResolveUserType = ({typeUser,newDrivers, onChangeInputs, handleDatePicker}) => {
    switch(user.typeUser){
      case 1:
        return <DriverUser 
        driver={state.driver}
        onChangeInputs={onChangeInputs}
        handleDatePicker={handleDatePicker} 
        newDrivers={newDrivers}
        />
      default:
        return <CompanyUser 
        company={state.company}
        onChangeInputs={onChangeInputs}
        handleDatePicker={handleDatePicker}
        newDrivers={newDrivers}
        />
    }
  };

  const selectUserType = (userType) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: userType })
  }


  const newDrivers = async () => {
    const { new_user } = state
    console.log('new_user',new_user);
    try {
      const { data } = await axios.post('/api/driver', new_user);
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