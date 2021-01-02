import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logoutUser, getCurrentLocation, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import { Menu, Row, Drawer, } from 'antd';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import '@styles/index.less';

function mapStateToProps(state) {
  const { user, landing } = state;
  return {
    token: user.token,
    isLoading: landing.isLoading,
    isAuthenticated: landing.isLogin,
    typeUser: user.typeUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: (router) => dispatch(logoutUser(router)),
    fetchUserData: (token, typeUser) => dispatch(fetchUserData(token, typeUser))
  }
};


const DrawerLayout = ({ setVisible, visible, typeUser, logoutUser, router }) => {
  let accountUrl = typeUser === 1 ? '/userProfile/driver/profile' : '/userProfile/company/profile';
  return (<>
    <Drawer
      bodyStyle={{ padding: 0, background: '#001628' }}
      placement='right'
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      key='right'
    >
      <Row justify='space-between' align='middle'>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item onClick={() => setVisible(false)} key="1" icon={<HomeOutlined />}>
            <Link href='/'>
              <a>
                Home
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item onClick={() => setVisible(false)} key="2" icon={<UserOutlined />}>
            <Link href={accountUrl}>
              <a>
                My Account
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item onClick={() => setVisible(false)} key="3" icon={<LogoutOutlined />} onClick={() => logoutUser(router)} >
            Logout
          </Menu.Item>
        </Menu>
      </Row>
    </Drawer>
  </>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerLayout));
