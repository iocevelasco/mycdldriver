import React, { useEffect, useState } from 'react';
import { Menu, Col, Button, Tooltip, Row } from 'antd';
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
  UserSwitchOutlined,
  ControlOutlined,
  FormOutlined
} from '@ant-design/icons';
import Link from 'next/link';


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


const SideNavAdmin = ({ user, section, isUserSuccess, router, logoutUser }) => {
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
      path: '/userProfile/company/services',
      section_name: 'Services',
      icon: <ControlOutlined />
    },
    {
      path: '/userProfile/company/candidate',
      section_name: 'Candidate',
      icon: <UserSwitchOutlined />
    },
    {
      path: '/userProfile/company/news',
      section_name: 'News',
      icon: <FormOutlined />
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
    <Col span={1} style={{ borderRight: '1px solid #f0f0f0' }}>
      <Menu
        style={{ width: '100%', borderRight: 'none' }}
        defaultSelectedKeys={[section]}
        mode='vertical'
        theme='light'>
        {
          menuOptions.map((e, i) => {
            return (
              <Menu.Item key={i} >
                <Link href={e.path}>
                  <Tooltip placement="right" title={e.section_name}>
                    {e.icon}
                  </Tooltip>
                </Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
      <Row style={{ paddingTop: 16 }} justify='center' gutter={[16, 16]}>
        <Col span={16}>
          {
            !isUserSuccess ? <Link href="/userProfile">
              <Tooltip placement="right" title={'Go back'}>
                <Button
                  icon={<LeftOutlined />}
                  type="primary"
                  shape="circle"
                  size='large' />
              </Tooltip>
            </Link> : null
          }
        </Col>
        <Col span={16}>
          <Tooltip placement="right" title={'Logout'}>
            <Button
              type="link"
              shape="circle"
              onClick={() => {
                router.push('/logout')
                logoutUser(router);
                window.localStorage.removeItem('token');
              }}
              icon={<LogoutOutlined />} />
          </Tooltip>
        </Col>
      </Row>
    </Col>
  )
}

SideNavAdmin.propTypes = {
  user: propTypes.object.isRequired,
  isUserSuccess: propTypes.number.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps
  )(SideNavAdmin));