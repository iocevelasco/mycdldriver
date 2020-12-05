import { useState } from 'react';

import { Button, Input, Space, Form } from 'antd';
import axios from 'axios';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const UserPassword = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const makeLogin = async (values) => {
    await axios.post('/api/login', values)
      .then((response) => { console.log('response', response) })
      .catch((err) => { console.log('err', err) })
  }

  return (
    <div className='login--form-login'>
      <Form
        fields={fields}
        form={form}
        onFinish={makeLogin}
        name="global_state"
        layout='vertical'>
        <Space direction="vertical">
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Email is required!',
              },
            ]}
            name='email'>
            <Input size='large' placeholder='Email' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Password is required!',
              },
            ]}
            name='password'>
            <Input.Password
              size='large'
              placeholder="password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Button
            type='primary'
            htmlType="submit" > Login </Button>
        </Space>
      </Form>
    </div>
  )
}

export default UserPassword;
