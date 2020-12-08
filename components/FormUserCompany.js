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
    isUserRegistry: state.user.typeUser || null,
  }
}

const FormUserCompany = (props) => {
  const [form] = Form.useForm();

  const [address, setAddress] = useState({
    stateId: '',
    cityId: ''
  })

  const [stateOptions, setOptions] = useState({
    options: [],
    all: []
  });

  const [cityOptions, setCities] = useState({
    options: [],
    all: [],
    disabled: true
  });

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
    if (changedFields.length) {
      let state = changedFields[0].name[0] === "state" ? changedFields[0] : false
      if (state) fetchCities(state.value)
    };
    onChangeCompany(allFields);
  }

  const fetchState = async () => {
    await axios.get('/api/address/state')
      .then((response) => {
        let options = response.data.data
          .sort((a, b) => {
            if (a.stateName < b.stateName) { return -1; }
            if (a.stateName > b.stateName) { return 1; }
            return 0;
          })
          .map((e) => { return { value: e.stateName, id: e._id } })
        let all = response.data.data
        setOptions({
          options,
          all
        });
      })
      .catch((err) => {
        setState([]);
        console.log(err)
      })
  }

  const fetchCities = async (stateId) => {
    setCities({
      options: [],
      disabled: true
    })
    await axios.get(`/api/address/cities/${stateId}`)
      .then((response) => {
        let options = response.data.data
          .sort((a, b) => {
            if (a.cityName < b.cityName) { return -1; }
            if (a.cityName > b.cityName) { return 1; }
            return 0;
          })
          .map((e) => { return { value: e.cityName, id: e._id } })
        let all = response.data.data
        setCities({
          options,
          all,
          disabled: false
        })
      })
      .catch((err) => {
        setCities([]);
        console.log(err)
      })
  }

  useEffect(() => {
    fetchState();
  }, []);
  useEffect(() => {
    //fetchCities(cityInit);
  }, []);

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
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  name='address'
                  label="Address line 1"
                  rules={[
                    {
                      required: true,
                      message: 'State is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='address2'
                  label="Address line 2"
                  rules={[
                    {
                      required: true,
                      message: 'Address line 2 is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={8}>
                <Form.Item label="State / Province / Reagion">
                  <Form.Item
                    name={'state'}
                    noStyle
                    rules={[{ required: true, message: 'Province is required' }]}
                  >
                    <Select placeholder="Select province">
                      {
                        stateOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
                      }
                    </Select>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="City">
                  <Form.Item
                    name={'city'}
                    noStyle
                    rules={[{ required: true, message: 'City is required' }]}
                  >
                    <Select
                      disabled={cityOptions.disabled}
                      placeholder="Select city"
                      showSearch
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {
                        cityOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
                      }
                    </Select>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name='zipCode'
                  label="Zip / Postal Code"
                  rules={[
                    {
                      required: true,
                      message: 'Zip code is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
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
