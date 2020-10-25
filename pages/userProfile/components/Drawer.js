import React, { useEffect, useReducer } from 'react';
import {
  Row,
  Col,
  Menu
} from 'antd';

import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';

const DrawerComponent = ({ user, ...props }) => {


  useEffect(() => {
  }, []);

  return (
      <>
      <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['1']}
          mode='vertical'>
          <Menu.Item key="1" icon={<SettingOutlined />}>
            Navigation One
          </Menu.Item>
          </Menu>
      </>
  )
};

export default DrawerComponent;