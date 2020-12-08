import React from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
} from 'antd';
import FormUserExperience from './FormUserExperience';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';

const DriverProfileView = (props) => {
  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundSize: 'contain',
  }

  return (
    <MainLayout title='Experience'>
      <Row display='flex' justify='center'>
        <SideNav currentLocation='2' />
        <Col span={20}>
          <WrapperSection styles={stylesWrapper} row={16} mt={0}>
            <FormUserExperience />
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default DriverProfileView;