import React, { useEffect, useState } from 'react';
import { Menu, Col } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  ToolOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const SideNavAdmin = ({ typeUser, currentLocation }) => {
  console.log('typeUser',typeUser);
  const [menuOptions, setOptions] = useState([]);

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
      </Col>
    )
};

export default SideNavAdmin;