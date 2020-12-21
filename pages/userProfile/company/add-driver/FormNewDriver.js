import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Avatar,
  Form,
  Button,
  Upload,
  Drawer,
  InputNumber,
  Radio,
  DatePicker,
  notification,
  message
} from 'antd';
import {
  updateUserDrive
} from '@store/reducers/user_reducer';
import { SpinnerComp } from 'components/helpers';

import { connect } from 'react-redux';
import { withRouter } from 'next/router';

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const NewDriverForm = ({ addNewDriver, loader, ...props }) => {
  const [form] = Form.useForm();

  return (
    <div className='add-driver'>
      <Row justify='center'>
        <Col className='add-driver__form' span={24}>
          <Form
            form={form}
            onFinish={addNewDriver}
            name="new_driver"
            layout='vertical'>

            <Row gutter={[24]} justify='space-between' >
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Last name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Email is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Dln'
                  name="dln"
                  rules={[
                    {
                      required: true,
                      message: 'dln is required!',
                    },
                  ]}>
                  <InputNumber
                    min={0}
                    max={900000000000000}
                    style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'>Send invitation </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={loader} />
    </div >
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDriverForm)
); 
