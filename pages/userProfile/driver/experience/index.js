import React, { useState, useEffect } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
} from 'antd';
import FormExperience from './FormExperience';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';
import './styles.less';


function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photo: user.photo || '',
    facebook_id: user.facebook_id || '',
    google_id: user.google_id || '',
    _id: user._id || null,
    token: user.token || null,
    driver: user.driver || {},
    isUserRegistry: state.user.typeUser || null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const DriverExperience = (props) => {
  const [fields, setFields] = useState([]);

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
          <WrapperSection styles={stylesWrapper} row={22} mt={0}>
            <FormExperience
              fields={fields}
              propsUpload={props.upload} />
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (DriverExperience)); 