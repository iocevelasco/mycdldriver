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
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  is_cdl:false,
  new_user: {
    name: '',
    lastname: '',
    photo: '',
    email: '',
    google_id: '',
    facebook_id: '',
    cdl: '',
    birthDate: '',
    sex: '',
    areaCode: '',
    phoneNumber: '',
    address: '',
    habilities: '',
    description: '',
    experience: '',
    zipCode: '',
    expirationDate:''
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

  useEffect(() => {
    if (!user) return;
    let new_user = state.new_user;
    new_user.name = user.name || '';
    new_user.lastname = user.lastname || '';
    new_user.google_id = user.google_id || '';
    new_user.facebook_id = user.facebook_id || '';
    new_user.photo = user.photo || '';
    new_user.email = user.email || '';

    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }, [])

  const onChangeInputs = (e, key) => {
    let new_user = state.new_user;
    let value = "";
    switch (key) {
      default:
        value = e.target.value;
        new_user[key] = value;
        break;
    }
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }

  const handleDatePicker = (obj, date, key) => {
    let new_user = state.new_user;
    state.new_user[key] = date
    dispatch({ type: types.CREATE_NEW_USER, payload: new_user })
  }

  const newRequest = () => {
    const { new_request, fileArray } = state

    for (let key in new_request) {
      if (!new_request[key]) return message.warning('All fields are required');
    }
    dispatch({ type: types.START_CREATE_POST });

    const file_data = new FormData();
    for (var i = 0; i < fileArray.length; i++) {
      file_data.append("file_final", fileArray[i]);
    }
    file_data.append("type", new_request.type)
    file_data.append("project_id", new_request.project_id);
    file_data.append("description", new_request.description);
    file_data.append("title", new_request.title);

    request.post("/request", { data: file_data })
      .then(response => {
        dispatch({ type: types.CREATE_REQUEST_SUCCESS });
        props.getRequest();
      })
      .catch(error => {
        console.log("error en view: ", error.response.data.result.message);
        dispatch({ type: types.ERROR_CREATE_POST });
      });
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
                    <Avatar src={state.new_user.photo} size={120} />
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
                          value={state.new_user.name}
                          onChange={(e) => onChangeInputs(e, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Last Name"
                          value={state.new_user.lastname}
                          onChange={(e) => onChangeInputs(e, 'lastname')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="Mail"
                      value={state.new_user.email}
                      onChange={(e) => onChangeInputs(e, 'email')} />
                  </Form.Item>
                  <Row gutter={[24]} justify='space-between' align='middle'>
                    <Col span={12}>
                       <Form.Item>
                        <DatePicker
                          size='large'
                          style={{width: '100%'}}
                          placeholder="Birth Date"
                          onChange={(obj, key)=>handleDatePicker(obj, key, 'birthDate')}/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Radio.Group
                          value={state.new_user.sex}
                          onChange={(e) => onChangeInputs(e, 'sex')}>
                          <Radio value={0}>F</Radio>
                          <Radio value={1}>M</Radio>
                          <Radio value={1}>Other</Radio>
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
                          onChange={(e) => onChangeInputs(e, 'dln')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <DatePicker
                          size='large'
                          placeholder="Experation Date"
                          style={{width: '100%'}}
                          onChange={(obj, key)=>handleDatePicker(obj, key, 'expirationDate')}/>
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
                          onChange={(e) => onChangeInputs(e, 'areaCode')} />
                          </Form.Item>
                      </Col>
                      <Col span={18}>
                          <Form.Item>
                        <Input
                          size='large'
                          placeholder="Phone Number"
                          value={state.new_user.phoneNumber}
                          onChange={(e) => onChangeInputs(e, 'phoneNumber')} />
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
                          onChange={(e) => onChangeInputs(e, 'zipCode')} />
                          </Form.Item>
                      </Col>
                      <Col span={18}>
                      <Form.Item>
                        <Input
                          size='large'
                          placeholder="Address"
                          value={state.new_user.Address}
                          onChange={(e) => onChangeInputs(e, 'Address')} />
                        </Form.Item>
                      </Col>
                    </Row>
                </Form>
              </Col>
              <Col className='profile-driver__form' span={14}>
              <Form.Item label="Experience">
              <InputNumber 
                  size="large" 
                  min={1} 
                  max={100000}
                  defaultValue={3} 
                  onChange={(e) => onChangeInputs(e, 'experience')} />
                  </Form.Item>
              <Form.Item>
                    <TextArea
                      rows={4}
                      size='large'
                      placeholder="Description"
                      value={state.new_user.description}
                      onChange={(e) => onChangeInputs(e, 'description')} />
                  </Form.Item>
              <Row gutter={[24]} justify='end'  align='middle'>
                  <Col span={6}>
                    <Button type='primary' block size='large'>Save Information</Button>
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