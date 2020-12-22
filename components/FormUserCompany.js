import React from 'react';
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Form,
  Button,
  Typography,
  Select
} from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { SpinnerComp } from 'components/helpers';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import AddressInputs from 'components/AddressInput';
import { ImageProfile } from 'components/UploadImages';


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
  const [arr, setArr] = useState([]);
  const fileList = [];
  const {
    loading,
    onChangeCompany,
    fields,
    newCompany,
    updateCompany,
    setImageProfile,
    imageProfile,
    token,
  } = props;


  const onChangeProps = (changedFields, allFields) => {
    onChangeCompany(allFields);
  }

  const resolveImageProfile = (imageProfile, photoProfile) => {
    try {
      return {
        avatar: imageProfile ? imageProfile.data.file : photoProfile
      }
    } catch (err) {
      return {
        avatar: photoProfile
      }
    }
  }

  const { avatar } = resolveImageProfile(imageProfile, props.photoProfile)
  console.log('avatar', avatar)
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
              <ImageProfile
                arr={arr}
                setArr={setArr}
                imageProfile={avatar}
                setImageProfile={setImageProfile}
                fileList={fileList}
                token={token}
              />
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
            <AddressInputs stateId={props.user.company.state} />
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
