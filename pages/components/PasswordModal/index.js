import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import { Typography, Modal, Button, Col, Row, Input, Form } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import "./styles.less";

function mapStateToProps(state) {
  return {

    visible_modal_login: state.landing.visible_modal_login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleModal: (props) => dispatch(handlerModalLogin(props)),
    handleActiveModal: (props) => dispatch(activeLoading(props))
  }
};

const PasswordModal = ({ visible, password, router, ...props }) => {
  const [form] = Form.useForm();
  const handleModal = () => {
    props.handleModal(false);
    setNewUser(false);
  }

  const style = {
    height: '400px',
    top: 16,
  }

  return (
    <Modal
      style={style}
      visible={visible}
      footer={null}
      width={420}
      onCancel={handleModal}>
      <div className='login_password'>
        <div className='login_password--title'>
          <Title level={3}> Change your password </Title>
          <Text> Enter your current password and new password</Text>
        </div>
        <Form
          form={form}
          name="global_state"
          layout='vertical'>
          <Row gutter={[24]} justify='space-between' >
            <Col span={24}>
              <Form.Item
                label='Current password'
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
            <Col span={24}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: false,
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
          <Row gutter={[24]} justify='center' align='middle'>
            <Col span={12}>
              <Button
                style={{ marginTop: 24 }}
                type='secondary'
                shape="round"
                htmlType="submit"
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
                size='large'> Change password </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PasswordModal)
);
