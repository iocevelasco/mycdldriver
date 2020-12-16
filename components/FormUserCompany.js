import React from 'react';
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Avatar,
  Form,
  Button,
  Upload,
  Typography,
  Select
} from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { RetweetOutlined } from '@ant-design/icons';
import { SpinnerComp } from 'components/helpers';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import AddressInputs from 'components/AddressInput';
import axios from 'axios';
const { Option } = Select;
const { Title } = Typography;
function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photoProfile: user.photo || '',
    _id: user._id || null,
    token: user.token || null,
    company: user.company || {},
    isUserRegistry: state.user._id || null,
  }
}

const FormUserCompany = (props) => {
  const [form] = Form.useForm();

  const {
    loading,
    onChangeCompany,
    fields,
    newCompany,
    updateCompany,
    beforeUpload,
    propsPhoto,
    imageProfile } = props;


  const onChangeProps = (changedFields, allFields) => {
    onChangeCompany(allFields);
  }


  return (
    <div className='profile-driver'>
      <Form
        fields={fields}
        form={form}
        onFinish={!props.isUserRegistry ? newCompany : updateCompany}
        name="global_state"
        layout='vertical'
        onFieldsChange={onChangeProps} >

        <Row justify='center'>
          <Col className='profile-driver__form' span={20}>
            <Row justify='center'>
              <div className='avatar'>
                <Avatar src={imageProfile ? imageProfile.data.file : props.photoProfile} size={120} />
                <Upload {...propsPhoto}
                  fileList={props.photo}
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                >
                  <Button
                    type='primary'
                    size='small'
                    shape="circle"
                    icon={<RetweetOutlined />} />
                </Upload>
              </div>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  name='tradename'
                  label="Trade Name"
                  rules={[
                    {
                      required: true,
                      message: 'Trade Name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='legalNumber'
                  label="Tax id"
                  rules={[
                    {
                      required: true,
                      message: 'tax id is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
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
              <Col span={12}>
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
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  label='Change password'
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  name='password'>
                  <Input.Password
                    placeholder="password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item
                  label='Area code'
                  name="areaCode"
                  rules={[
                    {
                      required: true,
                      message: 'Area code expiration date is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  label='Phone Number'
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Phone number date is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <AddressInputs {...props} />
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  htmlType="submit"
                  type='primary'
                  style={{ marginTop: 40 }}
                  shape="round"
                  block
                  size='large'>{!props.isUserRegistry ? 'Create Profile' : 'Save changes'}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <SpinnerComp active={loading} />
    </div>
  )
}

export default withRouter(
  connect(
    mapStateToProps)
    (FormUserCompany)); 
