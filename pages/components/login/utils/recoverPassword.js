import { useState } from 'react';
import {
  Button,
  Input,
  Space,
  Form,
  Typography,
  notification
} from 'antd';
import axios from 'axios';
const { Title } = Typography;
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import { SpinnerComp } from 'components/helpers';

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

const RecoverPassword = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [loading, setLoader] = useState(false);
  const { router } = props;

  const onFinish = async (values) => {
    setLoader(true);
    await axios.post('/api/user/recover_password', { email: values.email }).then((response) => {
      notification['success']({
        message: 'Success',
        description:
          "Please check your email we send the link to reset the password"
      });
      setLoader(false);
    }).catch((err) => {
      setLoader(false);
      console.log('err', err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! email incorrect. "
      });
    });
    props.handleModal(false);
  }

  return (
    <div className='login--recover-password'>
      <Title level={4}> Enter your email to recover your password </Title>
      <div className='form'>
        <Form
          fields={fields}
          form={form}
          onFinish={onFinish}
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
            <Button
              type='primary'
              htmlType="submit"> Recover Password </Button>
          </Space>
        </Form>
      </div>
      <Button icon={<LeftOutlined />} type='link' onClick={() => props.setRecoverPass(false)}> Go back </Button>
      <SpinnerComp active={loading} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)); 
