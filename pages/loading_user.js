import React from 'react';
import { useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  Typography,
  Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 60, color: '#FF2A39' }} spin />;

const LoadingUser = ({ active }) => {
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
      marginTop: 32
    }
  }
  useEffect(() => {
    if (active) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [active]);

  return (
    <div style={styles.content}>
      <div style={styles.wrapper}>
        <Spin indicator={antIcon} />
        <Title level={3} style={styles.title}> Loagin </Title>
      </div>
    </div>
  )
}

export default LoadingUser;