import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Avatar,
  Form,
  Button,
  Upload,
  InputNumber,
  Radio,
  DatePicker,
  notification,
  message
} from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, UploadOutlined, RetweetOutlined } from '@ant-design/icons';
import {
  updateUserDrive
} from '@store/reducers/user_reducer';
import { SpinnerComp } from 'components/helpers';
import { ImageProfile } from 'components/UploadImages';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';
import AddressInputs from './AddressInput';

const { TextArea } = Input;

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photoProfile: user.photo || '',
    facebook_id: user.facebook_id || '',
    google_id: user.google_id || '',
    _id: user._id || null,
    token: user.token || null,
    driver: user.driver || {},
    isUserRegistry: state.user._id || null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const DriverUser = ({user, ...props}) => {
  const { router } = props;
  const [form] = Form.useForm();
  const [loading, setLoader] = useState(false);
  const [fields, setFields] = useState([]);
  const [imageProfile, setImageProfile] = useState(null);

  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };

    useEffect(() => {
    let fields = [];

    for (let key in user) {
      let inputs = {
        name: [key],
        value: user[key]
      }
      fields.push(inputs);
    }

    for (let key in user.company) {
      let inputs = {
        name: [key],
        value: user.company[key]
      }
      fields.push(inputs);
    }
    setFields(fields);
  }, []);

  const saveApply = async () => {
    const apply = {
      job: router.query.id,
      company: props.company
    };

    await axios.post('/api/company/jobs/apply', apply, header)
      .then((response) => {
        dispatch({ type: types.SHOW_SUCCESS, payload: true });
        dispatch({ type: types.PROPS_APPLY, payload: false });
      });
  }

  const newDrivers = async (fields) => {
    const { driver, base } = await beforeToCreateProfile(fields, 'create');
    const fullDriver = { base: base, ...driver };
    await axios.post('/api/driver', fullDriver)
      .then((response) => {
        props.handleNewDriverProps(response.data.data);
        if (props.isJobs) {
          saveApply();
        };
        setLoader(false);
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
        });
      })
      .catch((err) => {
        console.log('[ user registry error ]', err);
        setLoader(false);
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this user, please try again. "
        });
      })
  }

  const updateDriver = async (fields) => {
    const { driver, base } = await beforeToCreateProfile(fields, 'update');
    const fullDriver = { base: base, ...driver };
    try {
      await axios.patch('/api/driver', fullDriver, header)
        .then((response) => {
          const { foundDriver, user } = response.data.data
          const data = {
            driver: foundDriver,
            user
          }
          props.handleNewDriverProps(data);
          if (props.isJobs) {
            saveApply();
          }
          setLoader(false);
          notification['success']({
            message: 'Success',
            description:
              "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
          });
        })
    } catch (err) {
      setLoader(false);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save the information correctly , please try again."
      });
      console.log(err);
    }
  };

  const beforeToCreateProfile = async (fields, type) => {
    setLoader(true);
    try {
      const { google_id, facebook_id, photo, email } = user;
      const { name, dln, lastname, zipCode, state, sex, phoneNumber, password, confirm, city, birthDate, areaCode, address2, address } = fields;

      let base = {}
      let driver = {}

      if (type === 'update') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 1;
        base.photo = imageProfile ? imageProfile.data.file : photo;
      }
      if (type === 'create') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 1;
        base.photo = imageProfile ? imageProfile.data.file : photo;
        base.email = email;
        base.google_id = google_id;
        base.facebook_id = facebook_id;
        base.password = password;
      }

      driver.zipCode = zipCode;
      driver.state = state;
      driver.imageDln = '',
        driver.dln = dln;
      driver.sex = sex;
      driver.phoneNumber = phoneNumber;
      driver.password = password;
      driver.confirm = confirm;
      driver.city = city;
      driver.birthDate = birthDate;
      driver.areaCode = areaCode;
      driver.address2 = address2;
      driver.address = address;

      return {
        driver,
        base
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={24}>
          <Row justify='center'>
            <ImageProfile
              imageProfile={avatar}
              setImageProfile={setImageProfile}
              token={props.token}
            />
          </Row>
          <Form
            fields={fields}
            form={form}
            onFinish={props.isUserRegistry ? updateDriver : newDrivers}
            name="global_state"
            layout='vertical'>

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
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
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
              {props.isUserRegistry ? '' :
                <Col span={12}>
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
                </Col>}
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item
                  label='Birth date'
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message: 'Birth date is required!',
                    },
                  ]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Sex'
                  name="sex"
                  rules={[
                    {
                      required: true,
                      message: 'Sex is required!',
                    },
                  ]}>
                  <Radio.Group>
                    <Radio value={0}>F</Radio>
                    <Radio value={1}>M</Radio>
                    <Radio value={2}>Other</Radio>
                  </Radio.Group>
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
            <AddressInputs stateId={user.driver.state} />
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'>{props.isUserRegistry ? 'Update Information' : 'Complete profile'} </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={loading} />
    </div >
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverUser)
); 