import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Button, InputNumber, Space, Radio, DatePicker, notification, message } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateUserDrive } from '@store/reducers/user_reducer';
import { ImageProfile } from 'components/UploadImages';
import PasswordModal from 'components/PasswordModal';
import axios from 'axios';
import { withRouter } from 'next/router';
import AddressInputs from 'components/AddressInput';
import moment from 'moment';
import { WrapperSection } from 'components/helpers';
import { activeLoading } from '@store/reducers/landing_reducer'

function mapStateToProps(state) {
  const { user } = state;
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (f) => dispatch(activeLoading(f)),
    fetchUserData: (token, typeUser) => dispatch(fetchUserData(token, typeUser)),
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const NewDriverUser = (props) => {
  const { router } = props;
  const [form] = Form.useForm();
  const [visibleModalPassword, setVisiblePassword] = useState(false);
  const [fields, setFields] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [configPsw, setPsw] = useState({
    password: null,
    isPassword: false
  });

  const token = router.query.token;
  useEffect(() => {
    if (token) {
      fetchUserData(token)
    } else {
      router.push('/')
    }
  }, [])

  const fetchUserData = async (token) => {
    await axios.post(`/api/user/me`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        let user = response.data.data;
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
        props.activeLoading(false);
      })
      .catch((res) => {
        router.push('/');
      });
  }

  const updateDriver = async (fields) => {
    const { driver, base } = await beforeToCreateProfile(fields);
    const fullDriver = { base: base, ...driver };
    try {
      await axios.patch('/api/driver', fullDriver, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const { foundDriver, user } = response.data.data
          user.token = token;

          const data = {
            driver: foundDriver,
            user
          }
          props.handleNewDriverProps(data);
          router.push('/userProfile/driver/profile');
          notification['success']({
            message: 'Success',
            description:
              "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
          });
        })
    } catch (err) {
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save the information correctly , please try again."
      });
      console.log(err);
    }
  };

  const beforeToCreateProfile = async (fields) => {
    passwordValidator();
    try {
      const { name, dln, lastname, zipCode, email, state, sex, phoneNumber, city, birthDate, areaCode, address2, address } = fields;

      let base = {};
      let driver = {};

      base.name = name;
      base.lastname = lastname;
      base.typeUser = 1;
      base.photo = newImage;
      base.email = email;

      driver.zipCode = zipCode;
      driver.state = state;
      driver.dln = dln;
      driver.sex = sex;
      driver.phoneNumber = phoneNumber;
      driver.password = configPsw.password;
      driver.city = city;
      driver.birthDate = birthDate;
      driver.areaCode = areaCode;
      driver.address2 = address2;
      driver.address = address;

      console.log('driver', driver);
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
    <WrapperSection row={18}>
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
              onFinish={updateDriver}
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

              <Row gutter={[24]} justify='space-between' align='middle'>
                <Col span={12}>
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
                  <Col span={12}>
                    <Form.Item
                      label='DlN'
                      name="dln"
                      rules={[
                        {
                          required: true,
                          message: 'dln is required!',
                        },
                      ]}>
                      <Input />
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
                <Col span={6}>
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
                <Col span={6}>
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
              <AddressInputs stateId={null} />
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
      </div >
    </WrapperSection>
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDriverUser)
);



