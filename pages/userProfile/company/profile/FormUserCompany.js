import React from 'react';
import { Row, Col, Input, Form, Button, Typography, Select } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PasswordModal from 'components/PasswordModal';
import { SpinnerComp } from 'components/helpers';
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
  const { company } = props.user;

  const [form] = Form.useForm();

  const {
    loading,
    fields,
    newCompany,
    updateCompany,
    setNewImage,
    newImage,
    setVisiblePassword,
    visibleModalPassword,
    configPsw,
    setPsw
  } = props;

  const resolveImageProfile = () => {
    try {
      return {
        avatar: newImage ? newImage : props.photoProfile
      }
    } catch (err) {
      return {
        avatar: photoProfile
      }
    }
  }

  const { avatar } = resolveImageProfile();

  return (
    <div className='profile-driver'>
      <Form
        fields={fields}
        form={form}
        onFinish={!props.isUserRegistry ? newCompany : updateCompany}
        name="global_state"
        layout='vertical' >

        <Row justify='center'>
          <Col className='profile-driver__form' span={20}>
            <Row justify='center'>
              <ImageProfile
                avatar={avatar}
                setNewImage={setNewImage}
                newImage={newImage}
                token={props.token}
              />
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col xs={24} xl={12}>
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
              <Col xs={24} xl={12}>
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
              <Col xs={24} xl={12}>
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
              <Col xs={24} xl={12}>
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
              <Col xs={24} xl={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: 'Email is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <span style={{ paddingTop: 39, display: 'block' }}>
                  <PasswordModal
                    setPsw={setPsw}
                    visible={visibleModalPassword}
                    handleModal={setVisiblePassword} />
                  <Button
                    type={configPsw.isPassword ? '' : 'danger'}
                    onClick={() => setVisiblePassword(true)}
                    size='large'
                    block
                    icon={<SafetyCertificateOutlined />}
                  >Setting Password</Button>
                </span>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col xs={24} xl={6}>
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
              <Col xs={24} xl={18}>
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
            <AddressInputs stateId={company.state} />
            <Row gutter={[24]} justify='center' align='middle'>
              <Col xs={24} xl={12}>
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
