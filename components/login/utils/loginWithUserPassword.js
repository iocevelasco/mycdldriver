import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Button, Input, Space, Form } from 'antd';
import { updateUserCompany, updateUserDrive } from '../../../store/reducers/user_reducer';
import axios from 'axios';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const mapStateToProps = (state) => {
  return {
    user: state.use,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserCompany: (newProps) => dispatch(updateUserCompany(newProps)),
    updateUserDrive: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const UserPassword = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const { router } = props;

  const makeLogin = async (values) => {
    //await axios.post('/prevpath', { prevpath: router.pathname, asPath: router.asPath });
    await axios.post('/auth/login', values)
      .then((response) => {
        const { date, email, lastname, name, photo, token, typeUser, _id, company, driver } = response.data;

        let user = {
          date,
          email,
          lastname,
          name,
          photo,
          token,
          typeUser,
          _id,
        }

        if (typeUser === 1) {
          let data = {
            user,
            driver
          }
          updateUserDrive(data);
        }

        if (typeUser === 2) {
          let data = {
            user,
            company
          }
          updateUserCompany(data);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPassword)); 
