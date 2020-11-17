import React from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
} from 'antd';
import FormUserDriver from 'components/FormUserDriver';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';

const DriverProfileView = (props) => {
  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24, 
    paddingBottom: 24,
    backgroundSize:'contain',
  }

  
    return (
      <MainLayout title='Profile'>
        <Row display='flex' justify='center'>
          <SideNav currentLocation='0' /> 
          <Col span={20}>
            <WrapperSection styles={stylesWrapper} row={16} mt={0}>
              <FormUserDriver />
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout>
    )
};

export default DriverProfileView;