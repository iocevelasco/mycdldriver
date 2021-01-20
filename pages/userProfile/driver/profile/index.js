import React from 'react';
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
    backgroundSize: 'contain',
  }

  const closeWindow = () => {
    if (typeof window !== "undefined") {
      const params = window.location.search;
      if (window.opener) {
        window.opener.postMessage(params);
        window.opener.location.reload();
        window.close();
      }
    }
  }

  return (
    <>
      <Row display='flex' justify='center'>
        {closeWindow()}
        <Col span={24} className="profile-company__jobs">
          <WrapperSection styles={stylesWrapper} row={20} mt={0}>
            <FormUserDriver />
          </WrapperSection>
        </Col>
      </Row>
    </>
  )
};

export default DriverProfileView;