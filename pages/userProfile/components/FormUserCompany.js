import React, { useEffect } from 'react';
import MainLayout from '../../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Form,
  Button,
  Upload,
  Switch,
  InputNumber,
  Radio,
  DatePicker,
  message
} from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { CloseOutlined, CheckOutlined, UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { SpinnerComp } from 'components/helpers';
const { Option } = Select;

const { TextArea } = Input;



function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photo: user.photo || '',
    _id: user._id || null,
    token: user.token || null,
    company: user.company || {},
    isUserRegistry: state.user.typeUser || null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const FormUserCompany = (props) => {
  const [form] = Form.useForm();
  const { loading, onChangeCompany, fields, newCompany, updateCompany, base, beforeUpload, propsUpload, propsPhoto, logo, photo } = props;

  const onChangeProps = (changedFields, allFields) => {
    onChangeCompany(allFields);
  }

  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={14}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={props.photo} size={120} />
            </div>
          </Row>
          <Form
            fields={fields}
            form={form}
            name="global_state"
            layout='vertical'
            onFieldsChange={onChangeProps}>
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
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item
                  name='zipCode'
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: 'Zip code is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  name='address'
                  label="Addres"
                  rules={[
                    {
                      required: true,
                      message: 'Address is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className='profile-driver__form-small' span={14}>
          <Row gutter={[24]} justify='space-between' >
            <Col span={24}>
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
          </Row>
          {/* <Row gutter={[24]} justify='space-between' >
            <Col span={12}>
              <Form.Item>
                <Upload {...propsUpload}
                  fileList={logo}
                  beforeUpload={beforeUpload}
                >
                  <Button icon={<UploadOutlined />}>Upload Image for Company</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Upload {...propsPhoto}
                  fileList={photo}
                  beforeUpload={beforeUpload}
                >
                  <Button icon={<UploadOutlined />}>Upload Photo for Company</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={[24]} justify='space-between' >
            <Col span={24}>
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
          <Row gutter={[24]} justify='end' align='middle'>
            <Col span={6}>
              {!props.isUserRegistry ? <Button
                onClick={newCompany}
                type='primary'
                block
                size='large'>Save Information</Button>
                : <Button
                  onClick={updateCompany}
                  type='primary'
                  block
                  size='large'>Update Information</Button>
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <SpinnerComp active={loading} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormUserCompany)); 
