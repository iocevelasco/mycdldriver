import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import {
  Typography,
  Modal,
  Button,
  Form,
} from 'antd';
import SocialNetworkButtons from './utils/SocialNetwork';
import UserPassword from './utils/loginWithUserPassword';

const { Text, Title } = Typography;

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

const ModalLogin = ({ visible_modal_login, router, ...props }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [path, setPath] = useState();

  const style = {
    height: '100vh',
    top: 16,
  }

  const makeLogin = (values) => {
    console.log('values', values);

  }

  return (
    <Modal
      style={style}
      visible={visible_modal_login}
      footer={null}
      width={420}
      onOk={() => props.handleModal(false)}
      onCancel={() => props.handleModal(false)}
    >
      <div className='login'>
        <div className='login--title'>
          <img src='/static/images/logo.svg' />
          <Title level={3}>Welcome!</Title>
        </div>
        <div className='button-container'>
          <UserPassword />
          <div className='login--divider'>
            <span> </span><p> or </p><span> </span>
          </div>
          <SocialNetworkButtons />
          <div class="login--registry-box">
            <p> Are you driver or company and you don't have acount?</p>
            <Button type='link'>Create acount</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLogin));
