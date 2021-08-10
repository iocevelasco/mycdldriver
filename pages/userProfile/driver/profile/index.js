import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import FormUserDriver from 'components/FormUserDriver';
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import { activeLoading } from '@store/reducers/landing_reducer';
import './styles.less';

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
  }
}

const DriverProfileView = (props) => {

  useEffect(() => {
    props.activeLoading(false)
  }, [])

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
    <WrapperDashboard section={0}>
      <Row display='flex' justify='center'>
        {closeWindow()}
        <Col span={24} className="profile-company__jobs">
          <WrapperSection styles={stylesWrapper}row={20} mt={0}>
            <FormUserDriver />
          </WrapperSection>
        </Col>
      </Row>
    </WrapperDashboard>
  )
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (DriverProfileView));