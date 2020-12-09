import { useState } from 'react';
import {
  Button,
  Input,
  Space,
  Form,
  Typography,
  Radio
} from 'antd';
import axios from 'axios';
const { Title } = Typography;
import { EyeTwoTone, EyeInvisibleOutlined, LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { setPropsUserReg } from '@store/reducers/user_reducer';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import { SpinnerComp } from 'components/helpers';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPropsUserReg: (newProps) => {
      dispatch(setPropsUserReg(newProps))
    },
    handleModal: (props) => dispatch(handlerModalLogin(props))
  }
}

const NewUserForm = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [loading, setLoader] = useState(false);
  const { router } = props;

  const makeReg = async (values) => {
    setLoader(true);
    const newUser = {
      photo: 'https://www.unitecnar.edu.co/sites/default/files/pictures/user_default.png',
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      typeUser: values.typeUser,
      isLogin: true
    }
    props.setPropsUserReg(newUser);
    props.handleModal(false);
    if(values.typeUser === 1){
      router.push('/userProfile/driver/profile');
    }else if(values.typeUser === 2){
      router.push('/userProfile/company/profile');
    }
  }

  return (
    <div className='login--new-user'>
      <Title level={4}> Please complete all fields </Title>
      <div className='form'>
        <Form
          fields={fields}
          form={form}
          onFinish={makeReg}
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
              name='lastname'>
              <Input size='large' placeholder='Last name' />
            </Form.Item>
            <Form.Item
              label='Are you driver or Company?'
              rules={[
                {
                  required: true,
                  message: 'User type is required!',
                },
              ]}
              name='typeUser'>
              <Radio.Group>
                <Radio value={1}>Driver</Radio>
                <Radio value={2}>Company</Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              type='primary'
              htmlType="submit"> Create User </Button>
          </Space>
        </Form>
      </div>
      <Button icon={<LeftOutlined />} type='link' onClick={() => props.setNewUser(false)}> Go back </Button>
      <SpinnerComp active={loading} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewUserForm)); 
