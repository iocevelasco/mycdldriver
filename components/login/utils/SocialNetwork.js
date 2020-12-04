import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import {
  Typography,
  Button,
} from 'antd';
import axios from 'axios';


import {
  GoogleOutlined,
  FacebookOutlined
}
  from '@ant-design/icons';

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

const SocialNetworkButtons = (props) => {
  const { router } = props;
  return (
    <>
      <div className='login--socialnetwork'>
        <Button onClick={async () => {
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
    </>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialNetworkButtons));
