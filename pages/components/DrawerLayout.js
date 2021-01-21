import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logoutUser, getCurrentLocation, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import { Menu, Row, Drawer, } from 'antd';
import { 
  HomeOutlined, 
  LogoutOutlined, 
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  DashboardOutlined,
  UserSwitchOutlined } from '@ant-design/icons';

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
  const [menuOptions, setOptions] = useState([]);

  useEffect(() => {
    if (typeUser == 1) setOptions(driverOption);
    else if (typeUser == 2) setOptions(companyOption);
  }, [typeUser]);

  const companyOption = [
    {
      path: '/userProfile/company/profile',
      section_name: 'Profile',
      icon: <HomeOutlined />
    },
    {
      path: '/userProfile/company/staff',
      section_name: 'Staff',
      icon: <TeamOutlined />
    },
    {
      path: '/userProfile/company/jobs',
      section_name: 'Create jobs',
      icon: <CarOutlined />
    },
    {
      path: '/userProfile/company/candidate',
      section_name: 'Candidate',
      icon: <UserSwitchOutlined />
    }
  ]

  const driverOption = [
    {
      path: '/userProfile/driver/profile',
      section_name: 'Profile',
      icon: <UserOutlined />
    },
    {
      path: '/userProfile/driver/my-jobs',
      section_name: 'My Jobs',
      icon: <DashboardOutlined />
    },
    {
      path: '/userProfile/driver/experience',
      section_name: 'Experience',
      icon: <CarOutlined />
    }
  ]

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
          defaultSelectedKeys={['31']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item onClick={() => setVisible(false)} key="31" icon={<HomeOutlined />}>
            <Link href='/'>
              <a>
                Home
              </a>
            </Link>
          </Menu.Item>
          {
            menuOptions.map((e, i) => {
              return (
                <Menu.Item onClick={() => setVisible(false)} key={i} icon={e.icon}>
                  <Link href={e.path}>
                    <a>
                      {e.section_name}
                    </a>
                  </Link>
                </Menu.Item>)
            })
          }
          <Menu.Item onClick={() => setVisible(false)} key="30" icon={<LogoutOutlined />} onClick={() => logoutUser(router)} >
            Logout
          </Menu.Item>
        </Menu>
      </Row>
    </Drawer>
  </>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerLayout));
