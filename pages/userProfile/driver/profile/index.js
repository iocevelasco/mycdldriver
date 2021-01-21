import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import FormUserDriver from 'components/FormUserDriver';
import { WrapperDashboard } from 'components/helpers';

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
          <WrapperDashboard styles={stylesWrapper} row={20} mt={0}>
            <FormUserDriver />
          </WrapperDashboard>
        </Col>
      </Row>
    </>
  )
};

export default DriverProfileView;