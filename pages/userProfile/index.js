import React, { useEffect, useReducer, useState } from 'react';
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
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
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
  }
}

const types = {
  CREATE_NEW_USER: 'create_new_user',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.CREATE_NEW_USER:
      return { ...state, new_user: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const UserProfile = ({ user, ...props }) => {
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);
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
    console.log('new_user',new_user);
    try {
      const { data } = await axios.post('/api/driver', new_user);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MainLayout title='Profile' user={user}>
        <WrapperSection row={24} mt={0}>
          <div className='profile-driver'>
            <Row justify='center'>
              <Col className='profile-driver__form' span={14}>
                <Row justify='center'>
                  <div className='avatar'>
                    <Avatar src={state.new_user.base.photo} size={120} />
                  </div>
                </Row>
                <Form
                  layout='horizontal'
                  form={form}>
                  <Row gutter={[24]} justify='space-between' >
                    <Col span={12}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Name"
                          value={state.new_user.base.name}
                          onChange={(e) => onChangeInputs(e, 'name', 1)} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Last Name"
                          value={state.new_user.base.lastname}
                          onChange={(e) => onChangeInputs(e, 'lastname', 1)} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="Mail"
                      value={state.new_user.base.email}
                      onChange={(e) => onChangeInputs(e, 'email', 1)} />
                  </Form.Item>
                  <Row gutter={[24]} justify='space-between' align='middle'>
                    <Col span={12}>
                      <Form.Item>
                        <DatePicker
                          size='large'
                          style={{ width: '100%' }}
                          placeholder="Birth Date"
                          onChange={(obj, key) => handleDatePicker(obj, key, 'birthDate')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Radio.Group
                          value={state.new_user.sex}
                          onChange={(e) => onChangeInputs(e, 'sex', 0)}>
                          <Radio value={0}>F</Radio>
                          <Radio value={1}>M</Radio>
                          <Radio value={2}>Other</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[24]} justify='space-between' align='middle'>
                    <Col span={12}>
                      <Form.Item>
                        <Input
                          disabled={state.is_cdl}
                          size='large'
                          placeholder="DLN"
                          value={state.new_user.dln}
                          onChange={(e) => onChangeInputs(e, 'dln', 0)} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <DatePicker
                          size='large'
                          placeholder="Experation Date"
                          style={{ width: '100%' }}
                          onChange={(obj, key) => handleDatePicker(obj, key, 'expDateDln')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[24]} justify='space-between' >
                    <Col span={6}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Area Code"
                          value={state.new_user.areaCode}
                          onChange={(e) => onChangeInputs(e, 'areaCode', 0)} />
                      </Form.Item>
                    </Col>
                    <Col span={18}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Phone Number"
                          value={state.new_user.phoneNumber}
                          onChange={(e) => onChangeInputs(e, 'phoneNumber', 0)} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[24]} justify='space-between' >
                    <Col span={6}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Zip Code"
                          value={state.new_user.zipCode}
                          onChange={(e) => onChangeInputs(e, 'zipCode', 0)} />
                      </Form.Item>
                    </Col>
                    <Col span={18}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Address"
                          value={state.new_user.Address}
                          onChange={(e) => onChangeInputs(e, 'address', 0)} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col className='profile-driver__form-small' span={14}>
                <Form.Item label="Experience">
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={(e) => onChangeInputs(e, 'experience', 0)} />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    rows={4}
                    size='large'
                    placeholder="Description"
                    value={state.new_user.description}
                    onChange={(e) => onChangeInputs(e, 'description', 0)} />
                </Form.Item>
                <Row gutter={[24]} justify='end' align='middle'>
                  <Col span={6}>
                    <Button
                      onClick={newDrivers}
                      type='primary'
                      block
                      size='large'>Save Information</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

const WrapperSection = ({ children, row, mt, mb }) => {
  return (
    <div style={{ marginTop: mt, marginBottom: mb }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}


export default UserProfile;