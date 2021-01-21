import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Button, InputNumber, Radio, DatePicker, notification, message } from 'antd';
import { updateUserDrive } from '@store/reducers/user_reducer';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { SpinnerComp } from 'components/helpers';
import { ImageProfile } from 'components/UploadImages';
import { DLNinput } from 'components/inputs';
import { fetchUserData } from '@store/reducers/user_reducer';
import PasswordModal from 'components/PasswordModal';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';
import AddressInputs from './AddressInput';

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photoProfile: user.photo || '',
    token: user.token || null,
    isUserRegistry: user._id || null,
    isUserSuccess: user.typeUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
    fetchUserData: (token, typeUser) => dispatch(fetchUserData(token, typeUser))
  }
}

const DriverUser = ({ user, ...props }) => {
  const { router } = props;
  const [form] = Form.useForm();
  const [visibleModalPassword, setVisiblePassword] = useState(false);
  const [loading, setLoader] = useState(false);
  const [fields, setFields] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [configPsw, setPsw] = useState({
    password: null,
    isPassword: false
  });

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
    for (let key in user.driver) {
      if (key === 'birthDate') {
        let inputs = {
          name: [key],
          value: moment(user.driver[key])
        }
        fields.push(inputs);
      } else {
        let inputs = {
          name: [key],
          value: user.driver[key]
        }
        fields.push(inputs);
      }
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
    passwordValidator();
    const { driver, base } = await beforeToCreateProfile(fields, 'create');
    const fullDriver = { base: base, ...driver };
    await axios.post('/api/driver', fullDriver)
      .then((response) => {
        const data = response.data.data
        localStorage.setItem("token", data.token);
        localStorage.setItem("typeUser", data.typeUser);
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
      const { google_id, facebook_id, photo } = user;
      const { name, dln, lastname, zipCode, state, sex, phoneNumber, email, confirm, city, birthDate, areaCode, address2, address } = fields;

      let base = {}
      let driver = {}

      if (type === 'update') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 1;
        base.photo = newImage ? newImage : photo;
      }
      if (type === 'create') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 1;
        base.photo = newImage !== null ? newImage : photo;
        base.email = email;
        base.google_id = google_id;
        base.facebook_id = facebook_id;
      }

      driver.zipCode = zipCode;
      driver.state = state;
      driver.dln = dln;
      driver.sex = sex;
      driver.phoneNumber = phoneNumber;
      driver.password = configPsw.password;
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

  const resolveImageProfile = () => {
    try {
      return {
        avatar: newImage ? newImage : props.photoProfile
      }
    } catch (err) {
      return {
        avatar: props.photoProfile
      }
    }
  }

  const { avatar } = resolveImageProfile(newImage, props.photoProfile)

  const passwordValidator = () => {
    if (!configPsw.isPassword) {
      notification['error']({
        message: 'Error',
        description:
          'Please config your password'
      });
      return
    }
  }

  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={24}>
          <Row justify='center'>
            <ImageProfile
              avatar={avatar}
              setNewImage={setNewImage}
              newImage={newImage}
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

            <Row gutter={[24]} justify='space-between' align='middle'>
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
              {props.isUserRegistry ? '' :
                <Col xs={24} xl={12}>
                  <DLNinput />
                </Col>}
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col xs={24} xl={12}>
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
              <Col xs={24} xl={6}>
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
              <Col xs={24} xl={6}>
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
            <AddressInputs stateId={user.driver.state} />
            <Row gutter={[24]} justify='center' align='middle'>
              <Col xs={24} xl={12}>
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
