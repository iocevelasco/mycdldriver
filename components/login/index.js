import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { handlerModalLogin, activeLoading } from '@store/reducers/landing_reducer';
import {
  Typography,
  Modal,
  Button,
} from 'antd';
import SocialNetworkButtons from './utils/SocialNetwork';
import UserPassword from './utils/loginWithUserPassword';
import NewUserForm from './utils/NewUser';
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
  const [newUser, setNewUser] = useState(false);

  const handleModal = () => {
    props.handleModal(false);
    setNewUser(false);
  }

  const style = {
    height: '100vh',
    top: 16,
  }

  return (
    <Modal
      style={style}
      visible={visible_modal_login}
      footer={null}
      width={420}
      onCancel={handleModal}>
      <div className='login'>
        <div className='login--title'>
          <img src='/static/images/logo.svg' />
        </div>
        {
          !newUser ? <>
            <div className='login--title'>
              <Title level={3}>Welcome!</Title>
            </div>
            <UserPassword

              setNewUser={setNewUser} />
            <div className='login--divider'>
              <span> </span><p> or </p><span> </span>
            </div>
            <SocialNetworkButtons />
            <div class="login--registry-box">
              <p> Are you driver or company and you don't have account?</p>
              <Button type='link' onClick={() => setNewUser(true)}>Create Account</Button>
            </div>
          </> : <NewUserForm setNewUser={setNewUser} />
        }
      </div>
    </Modal>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLogin));