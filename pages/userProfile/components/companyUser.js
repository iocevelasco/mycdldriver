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

const DriverUser = (props) => {
  const { new_user} = props
  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={14}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={state.new_user.base.photo} size={120} />
            </div>
          </Row>
          <Form
            form={form}
            name="user-driver"
            validateMessages={validateMessages}
            initialValues={{ remember: true }}
            layout='horizontal'>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  validateStatus={state.new_user.base.name.length <= 0 ? 'error' : 'success'}
                  help="Should be combination of numbers & alphabets">
                  <Input
                    size='large'
                    placeholder="Name"
                    value={state.new_user.base.name}
                    onChange={(e) => onChangeInputs(e, 'name', 1)} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input
                    size='large'
                    placeholder="Last Name"
                    value={state.new_user.base.lastname}
                    onChange={(e) => onChangeInputs(e, 'lastname', 1)} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input
                size='large'
                placeholder="Mail"
                value={state.new_user.base.email}
                onChange={(e) => onChangeInputs(e, 'email', 1)} />
            </Form.Item>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <DatePicker
                    size='large'
                    style={{ width: '100%' }}
                    placeholder="Birth Date"
                    onChange={(obj, key) => handleDatePicker(obj, key, 'birthDate')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your password!' }]}>
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
                <Form.Item
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input
                    disabled={state.is_cdl}
                    size='large'
                    placeholder="DLN"
                    value={state.new_user.dln}
                    onChange={(e) => onChangeInputs(e, 'dln', 0)} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Select"
                  rules={[{ required: true, message: 'Please input your username!' }]}>
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
  )
}

export default DriverUser;