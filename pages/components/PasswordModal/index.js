import { withRouter } from 'next/router';
import { Typography, Modal, Button, Col, Row, Input, Form } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import "./styles.less";


const PasswordModal = ({ visible, setPsw, handleModal }) => {
  const [form] = Form.useForm();

  const style = {
    height: '400px',
    top: 16,
  }

  const onFinish = (fields) => {
    const { password, confirm } = fields;
    if (password === confirm) {
      setPsw({
        password,
        isPassword: true
      });
      handleModal(false);
    }
  }

  return (
    <Modal
      style={style}
      visible={visible}
      footer={null}
      width={420}
      onCancel={() => handleModal(false)}>
      <div className='login_password'>
        <div className='login_password--title'>
          <Title level={3}> Change your password </Title>
          <Text> Enter your current password and new password</Text>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          name="config_password"
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
                size='large'> Change password </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}

export default withRouter(PasswordModal);
