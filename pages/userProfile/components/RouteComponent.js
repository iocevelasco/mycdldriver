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

const initialState = {}

const RouteComponent = ({ user, ...props }) => {
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);

  useEffect(() => {
    verifyUserType(user.typeUser)
  }, []);

  const verifyUserType = (userType) => {
    dispatch({ type: types.SELECT_USER_TYPE, payload: userType })
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
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user });
  }

  const ResolveUserType = ({newDrivers, onChangeInputs, handleDatePicker}) => {
    switch(user.typeUser){
      case 1:
        return <DriverUser 
        driver={state.driver}
        base={state.base}
        onChangeInputs={onChangeInputs}
        handleDatePicker={handleDatePicker} 
        newDrivers={newDrivers}
        />
      default:
        return <CompanyUser
        base={state.base}
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
    const { driver } = state
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



export default RouteComponent;