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
  new_user: {
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
  new_company: {
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
      return { ...state, new_user: action.payload }
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
    let new_user = state.new_user;
    new_user.base.name = user.name || '';
    new_user.base.lastname = user.lastname || '';
    new_user.base.google_id = user.google_id || '';
    new_user.base.facebook_id = user.facebook_id || '';
    new_user.base.photo = user.photo || '';
    new_user.base.email = user.email || '';

    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }, [])

  const onChangeInputs = (e, key, base) => {
    let new_user = state.new_user;
    let value = "";
    switch (key) {
      case 'experience':
        value = e;
        new_user[key] = value;
        break;
      default:
        if (base) {
          value = e.target.value;
          new_user.base[key] = value;
        } else {
          value = e.target.value;
          new_user[key] = value;
        }
    }
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }

  const handleDatePicker = (obj, date, key) => {
    let new_user = state.new_user;
    state.new_user[key] = date
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }

  const newDrivers = async () => {
    const { new_user } = state
    try {
      const { data } = await axios.post('/api/driver', new_user);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const ResolveUserType = () => {
    switch(user.typeUser){
      case 1:
        return <DriverUser new_user={state.new_user} />
      case 2:
        return <CompanyUser new_company={state.new_company} />
    }
  };

  return (
    <MainLayout title='Profile' user={user}>
      <WrapperSection row={24} mt={0}>
        {
          state.user ? (
           <ResolveUserType 
           handleDatePicker={handleDatePicker}
           userType={user.typeUser}/> 
          ):( 
          <WrapperSection>pepe</WrapperSection>
          )
        }
      </WrapperSection>
    </MainLayout>
  )
}

const WrapperSection = ({row, mt, mb }) => {
  return (
    <div style={{ marginTop: mt, marginBottom: mb }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
            <Button> </Button>
        </Col>
      </Row>
    </div>
  )
}


export default UserProfile;