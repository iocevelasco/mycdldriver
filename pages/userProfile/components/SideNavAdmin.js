import React, { useEffect, useState } from 'react';
import { Menu, Col, Button, } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import propTypes from 'prop-types';
import { logoutUser } from '@store/reducers/user_reducer';
import {
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  DashboardOutlined,
  LeftOutlined,
  UserAddOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import Link from 'next/link';

// CONNECT WITH REDUX
function mapStateToProps(state) {
  return {
    user: state.user,
    isUserSuccess: state.user.typeUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser(router)),
  }
};


const SideNavAdmin = ({ user, currentLocation, isUserSuccess, router, logoutUser }) => {
  const [menuOptions, setOptions] = useState([]);
  const { typeUser } = user;

  useEffect(() => {
    if (typeUser == 1) setOptions(driverOption);
    else if (typeUser == 2) setOptions(companyOption);
  }, [typeUser]);

  const companyOption = [
    {
      path: '/userProfile/company/staff',
      section_name: 'Staff',
      icon: <TeamOutlined />
    },
    {
      path: '/userProfile/company/profile',
      section_name: 'Profile',
      icon: <HomeOutlined />
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

  return (
    <Col span={4}
      style={{ background: '#001529' }}>
      <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={[currentLocation]}
        mode='vertical'
        theme='dark'>
        {
          menuOptions.map((e, i) => {
            return (
              <Menu.Item key={i} icon={e.icon}>
                <Link href={e.path}>
                  <a>
                    {e.section_name}
                  </a>
                </Link>
              </Menu.Item>)
          })
        }
      </Menu>
      {
        !isUserSuccess ? <Link href="/userProfile">
          <Button
            shape="round"
            size="large"
            icon={<LeftOutlined />}
            type='primary'
            style={{
              marginTop: 16,
              width: '90%',
              marginLeft: 12,
            }}
          > Go Back </Button>
        </Link> : null
      }
      <Button
        shape="round"
        size="large"
        onClick={() => {
          router.push('/logout')
          logoutUser(router);
          window.localStorage.removeItem('token');
        }}
        icon={<LogoutOutlined />}
        type='link'
        style={{
          marginTop: 16,
          width: '90%',
          marginLeft: 12,
        }}
      > Logout </Button>
    </Col>
  )
}

SideNavAdmin.propTypes = {
  user: propTypes.object.isRequired,
  currentLocation: propTypes.string.isRequired,
  isUserSuccess: propTypes.number.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps
  )(SideNavAdmin));