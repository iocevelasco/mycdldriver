import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import {
  Typography,
  Modal,
  Button,
  Input
} from 'antd';
import axios from 'axios';


import {
  UserOutlined,
  GoogleOutlined,
  FacebookOutlined
}
  from '@ant-design/icons';

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

  return (
    <Modal
      visible={visible_modal_login}
      footer={null}
      width={380}
      onOk={() => props.handleModal(false)}
      onCancel={() => props.handleModal(false)}
    >
      <div className='modal-login'>
        <div className='title'>
          <Title level={3}>Welcome!</Title>
          <Text>Sign in for MyCDL</Text>
        </div>
        <div className='button-container'>
          <Button
            onClick={async () => {
              await axios.post('/prevpath', { prevpath: router.pathname, asPath: router.asPath });
            }} block size='large' >
            Registry
          </Button>
          <Button onClick={async () => {
            type = "primary"
            props.handleModal(false);
            props.handleActiveModal(true);
            await axios.post('/prevpath', { prevpath: router.pathname, asPath: router.asPath });
            router.push('/auth/google');
          }} icon={<GoogleOutlined />} block size='large' >
            Continue with Google
          </Button>

          <Button onClick={() => {
            props.handleModal(false);
            props.handleActiveModal(true);
            router.push('/auth/facebook');
          }} block size='large' style={{ background: '#1877f2', color: '#fff' }} icon={<FacebookOutlined />} >
            Continue with facebook
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLogin));
