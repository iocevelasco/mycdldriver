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
  AutoComplete,
  Typography
} from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { RetweetOutlined } from '@ant-design/icons';
import { SpinnerComp } from 'components/helpers';
import axios from 'axios';

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

  const [stateOptions, setOptions] = useState({
    options: [],
    all: []
  });

  const [citiesOptions, setCities] = useState({
    options: [],
    all: [],
    disabled: true
  });
  console.log('citiesOptions', citiesOptions);
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
      if (changedFields[0].name[0] === "state") {
        let value = changedFields[0].value;
        let options = [...stateOptions.all];
        let currentState = options.filter((e) => e.stateName === value)[0];
        if (currentState) fetchCities(currentState._id)
      };
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
          .map((e) => { return { value: e.stateName } })
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
      ...citiesOptions,
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
          .map((e) => { return { value: e.cityName } })
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

  const handleSearchState = (value) => {
    let options = stateOptions.options.filter(e => {
      return e.value.trim().toUpperCase().indexOf(value.trim().toUpperCase()) > -1;
    });
    setOptions({
      ...stateOptions,
      options,
    });
  }

  const handleSearchCity = (value) => {
    let options = citiesOptions.options.filter(e => {
      return e.value.trim().toUpperCase().indexOf(value.trim().toUpperCase()) > -1;
    });
    setCities({
      ...citiesOptions,
      options,
    });
  };

  useEffect(() => {
    fetchState();
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
                <Form.Item
                  name='state'
                  label="State / Province / Reagion"
                  rules={[
                    {
                      required: true,
                      message: 'State is required!',
                    },
                  ]}>
                  <AutoComplete
                    onSearch={handleSearchState}
                    options={stateOptions.options}
                    placeholder="Search state"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name='city'
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: 'City is required!',
                    },
                  ]}>
                  <AutoComplete
                    onSearch={handleSearchCity}
                    disabled={citiesOptions.disabled}
                    options={citiesOptions.options}
                    placeholder="Search city"
                  />
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
              <Col span={8}>
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
