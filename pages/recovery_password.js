import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';
import { Row, Col, Image, Form, Typography, Input, Button, Space, notification } from 'antd';
import { LoadingOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import { WrapperSection, SpinnerComp } from 'components/helpers';
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 60, color: '#FF2A39' }} spin />;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleModal: (props) => dispatch(handlerModalLogin(props))
  }
}

const onFinish = async (values) => {
  setLoader(true);
  await axios.post('/api/user/change_password', { password: values.password }).then((response) => {
    notification['success']({
      message: 'Success',
      description:
        "Success! Your Password has been changed!"
    });
  }).catch((err) => {
    setLoader(false);
    console.log('err', err);
    notification['error']({
      message: 'error',
      description:
        "Sorry! incorred password"
    });
  });
  props.handleModal(false);
}

const RecoverPassword = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [loading, setLoader] = useState(false);
  const { router } = props;
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
        <Title level={4}> Enter your email to recover your password </Title>
        <div className='form'>
          <Form
            fields={fields}
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
