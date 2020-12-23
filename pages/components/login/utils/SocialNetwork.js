import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useEffect } from 'react';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import { Button } from 'antd';
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
  let windowObjectReference = null;
  let previousUrl = null;

  const openSignInWindow = (url, name) => {
    var left = (screen.width/2)-(600/2);
    var top = (screen.height/2)-(700/2);
    const strWindowFeatures = `toolbar=no, menubar=no, width=600, height=700, top=${top}, left=${left}`;
    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }
    previousUrl = url;
    props.handleActiveModal(false);
  }

  return (
    <>
      <div className='login--socialnetwork'>
        <Button onClick={async () => {
          props.handleModal(false);
          props.handleActiveModal(true);
          await axios.post('/prevpath', { prevpath: router.pathname, asPath: router.asPath });
          //router.push('/auth/google');
          openSignInWindow('/auth/google','google');
        }} icon={<GoogleOutlined />} block size='large' >
          Continue with Google
          </Button>

        <Button onClick={() => {
          props.handleModal(false);
          props.handleActiveModal(true);
          //router.push('/auth/facebook');
          openSignInWindow('/auth/facebook','google');
        }} block size='large' style={{ background: '#1877f2', color: '#fff' }} icon={<FacebookOutlined />} >
          Continue with facebook
          </Button>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialNetworkButtons));
