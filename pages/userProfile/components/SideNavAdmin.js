import React, { useEffect, useState } from 'react';
import { Menu, Col,   Button, } from 'antd';
import { connect } from 'react-redux';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ToolOutlined,
  DashboardOutlined, 
  LeftOutlined
} from '@ant-design/icons';
import Link from 'next/link';

// CONNECT WITH REDUX
function mapStateToProps(state){
  return {
    user: state.user,
    isUseSucces: state.user.typeUser
  }
}

const SideNavAdmin = ({ user, currentLocation, isUseSucces }) => {
  const [menuOptions, setOptions] = useState([]);
  const { typeUser } = user;
  
  useEffect(() => {
    if (typeUser == 1) setOptions(driverOption);
    else if (typeUser == 2) setOptions(companyOption);
  }, [typeUser]);

  const companyOption = [
    {
      path: '/userProfile/company',
      section_name: 'Home',
      icon: <HomeOutlined />
    },
    {
      path: '/userProfile/company/profile',
      section_name: 'Profile',
      icon: <UserOutlined />
    },
    {
      path: '/userProfile/company/team',
      section_name: 'Team',
      icon: <TeamOutlined />
    },
    {
      path: '/userProfile/company/services',
      section_name: 'Services',
      icon: <ToolOutlined />
    },
    {
      path: '/userProfile/company/jobs',
      section_name: 'Jobs',
      icon: <TeamOutlined />
    },
  ]

  const driverOption = [
    {
      path: '/userProfile/driver',
      section_name: 'Home',
      icon: <HomeOutlined />
    },
    {
      path: '/userProfile/driver/profile',
      section_name: 'Profile',
      icon: <UserOutlined />
    },
    {
      path: '/userProfile/driver/myJobs',
      section_name: 'My Jobs',
      icon: <DashboardOutlined />
    },
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
                    {e.section_name}
                  </Link>
                </Menu.Item>)
            })
          }
        </Menu>
        {
        !isUseSucces ? <Link href="/userProfile">
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
      </Col>
    )
}

export default connect(mapStateToProps)(SideNavAdmin);