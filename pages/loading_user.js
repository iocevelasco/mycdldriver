import React from 'react';
import { useEffect } from 'react';
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 60, color: '#FF2A39' }} spin />;

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const LoadingUser = ({ user, active }) => {
  const styles = {
    wrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      alignContent: 'center',
      background: '#ffffffa3',
      zIndex: 10,
    },
    content: {
      height: '100vh',
    },
    title: {
      marginTop: 64
    }
  }
  useEffect(() => {
    if (active) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [active]);

  const closeWindow = () => {
    if (typeof window !== "undefined") {
      console.log(user);
      const params = window.location.search;
      if (window.opener) {
        window.opener.postMessage(params);
        if(user.typeUser == 0){
          window.opener.location.href = "/userProfile";
        }else if(user.typeUser == 2){
          window.opener.location.href = "/userProfile/company/staff";
        }else{
          window.opener.location.reload();
        }
        
        window.close();
      }
    }
  }

  return (
    <div style={styles.content}>
      {closeWindow()}
      <div style={styles.wrapper}>
        <Title level={3} style={styles.title}> Loading </Title>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingUser));