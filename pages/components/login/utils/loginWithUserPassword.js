import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Button, Input, Space, Form, message, notification } from 'antd';
import { updateUserCompany, updateUserDrive } from '@store/reducers/user_reducer';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import { SpinnerComp } from 'components/helpers';
import axios from 'axios';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserDrive: (newProps) => {
      dispatch(updateUserDrive(newProps))
    },
    updateUserCompany: (newProps) => {
      dispatch(updateUserCompany(newProps))
    },
    handleModal: (props) => dispatch(handlerModalLogin(props)),
  }
}

const UserPassword = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const { router } = props;
  const [loading, setLoader] = useState(false);

  const makeLogin = async (values) => {
    console.log(values);
    setLoader(true);
    await axios.post('/auth/login', values)
      .then((response) => {
        const { date, email, lastname, name, photo, token, typeUser, _id, company, driver } = response.data;
        let user = { date, email, lastname, name, photo, token, typeUser, _id }

        if (typeUser === 1) {
          let data = {
            user,
            driver
          }
          props.updateUserDrive(data);
          props.handleModal(false);
          router.push('/userProfile/driver/profile');
        }

        if (typeUser === 2) {
          let data = {
            user,
            company
          }
          props.updateUserCompany(data);
          props.handleModal(false);
          router.push('/userProfile/company/profile');
        }

      })
      .catch((err) => {
        setLoader(false);
        console.log('err', err);
        notification['error']({
          message: 'error',
          description:
            "Sorry! email or password incorrect. "
        });
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
      <SpinnerComp active={loading} />
    </div>
  )
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPassword)); 
