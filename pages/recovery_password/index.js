import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';
import { updateUserDrive } from '@store/reducers/user_reducer';
import { Row, Col, Form, Typography, Input, Button, Space, notification } from 'antd';
import { LoadingOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import { WrapperSection, SpinnerComp } from 'components/helpers';
import { updatePropsDriver, updatePropsCompany } from '@store/reducers/user_reducer';
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 60, color: '#FF2A39' }} spin />;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePropsDriver: (newProps) => dispatch(updatePropsDriver(newProps)),
    updatePropsCompany: (newProps) => dispatch(updatePropsCompany(newProps)),
  }
}

const RecoverPassword = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoader] = useState(false);
  const { router } = props;
  const token = router.query.token;

  const onFinish = async (values) => {
    setLoader(true);
    await axios.post('/api/user/change_password', { password: values.password }, { headers: { Authorization: `Bearer ${token}` } }
    ).then(async (response) => {
      await axios.post(`/api/user/me`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const typeUser = response.data.data.typeUser;
          if (typeUser == 1) {
            let { date, driver, lastname, name, _id, photo, email } = response.data.data;
            let driverProps = {
              company: null,
              isLogin: true,
              token: token,
              typeUser: 1,
              date, driver, lastname, name, _id, photo, email
            }
            props.updatePropsDriver(driverProps);
          }

          if (typeUser == 2) {
            let { date, company, lastname, name, _id, photo, email } = response.data.data;
            let companyProps = {
              driver: null,
              isLogin: true,
              typeUser: 2,
              token: token,
              date, company, lastname, name, _id, photo, email
            }
            props.updatePropsDriver(companyProps);
          }

          notification['success']({
            message: 'Success',
            description:
              "Success! Your Password has been changed!"
          });
          setLoader(false);
        })
    }).catch((err) => {
      setLoader(false);
      console.log('err', err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! incorred password"
      });
    });
  }

  useEffect(() => {
    setLoader(false);
  }, [])

  const styles = {
    content: {
      height: '65vh',
    },
    title: {
      marginTop: 64
    }
  }

  return (
    <WrapperSection row={6}>
      <div style={styles.content}>
        <Title level={4}> Enter your new password </Title>
        <div className='form'>
          <Form
            form={form}
            onFinish={onFinish}
            name="global_state"
            layout='vertical'>
            <Row gutter={[24]} justify='space-between' >
              <Col span={24}>
                <Form.Item
                  label='Password'
                  name='password'
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
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
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='secondary'
                  shape="round"
                  onClick={() => handleModal(false)}
                  block
                  size='large'> Cancel </Button>
              </Col>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'> Confirm </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <SpinnerComp active={loading} />
      </div>
    </WrapperSection>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)); 
