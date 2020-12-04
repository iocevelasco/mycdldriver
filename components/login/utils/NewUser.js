import { connect } from 'react-redux';
import { useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import {
  Button,
  Input,
  Space,
  Form,
  Typography
} from 'antd';
import axios from 'axios';
const { Title } = Typography;
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LeftOutlined
}
  from '@ant-design/icons';


const NewUserForm = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const makeLogin = async (values) => {
    await axios.post('/api/login', values)
      .then((response) => { console.log('response', response) })
      .catch((err) => { console.log('err', err) })
  }

  return (
    <div className='login--new-user'>
      <Title level={4}> Please complete all fields </Title>
      <div className='form'>
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
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Name is required!',
                },
              ]}
              name='name'>
              <Input size='large' placeholder='Name' />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Last name is required!',
                },
              ]}
              name='name'>
              <Input size='large' placeholder='Last name' />
            </Form.Item>
            <Button
              type='primary'
              htmlType="submit"> Create User </Button>
          </Space>
        </Form>
      </div>
      <Button icon={<LeftOutlined />} type='link' onClick={() => props.setNewUser(false)}> Go back </Button>
    </div>
  )
}

export default NewUserForm;
