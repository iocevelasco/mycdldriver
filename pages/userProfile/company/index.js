import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
} from 'antd';
import SideNav from '../components/SideNavAdmin';
import { WrapperSection, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

const initialState = {
  loading:false,
}
const types = {
  TEAM_DATA: 'team_data',
}
const reducer = (state, action) => {
  switch (action.type) {
  case types.TEAM_DATA:
    return { ...state, loading: false }
    default:
      throw new Error('Unexpected action');
  }
}

function mapStateToProps(state){
  return {
      userRedux: state.userRedux
  }
}

function mapDispatchToProps(dispatch){
  return {
    handlerUserProps: data => {
      dispatch({ type: 'USER_DATA', payload: data });
    },
  }
};



const ServiceCompanyView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    props.handlerUserProps(user);
    dispatch({ type: types.TEAM_DATA });
  }, [user]);

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24, 
    paddingBottom: 24,
    backgroundSize:'contain',
  }

  return (
    <MainLayout title='Team' user={user}  loading={state.loading}>
      <Row display='flex' justify='center'>
       <SideNav 
       currentLocation='0'/> 
        <Col span={props.userCreated ? 24: 20}>
          <WrapperSection style={stylesWrapper} row={24}>
              <BuildSection/>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceCompanyView));