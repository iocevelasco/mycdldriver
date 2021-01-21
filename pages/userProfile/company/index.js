import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import { Row, Col } from 'antd';
import { WrapperSection, WrapperDashboard, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { activeLoading } from '@store/reducers/landing_reducer';
const initialState = {
  loading: false,
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

function mapStateToProps(state) {
  return {
    userRedux: state.userRedux
  }
}

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
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
    backgroundSize: 'contain',
  }

  return (
    <WrapperDashboard>
      <Col span={props.userCreated ? 24 : 20}>
        <WrapperSection style={stylesWrapper} row={24}>
          <BuildSection />
        </WrapperSection>
      </Col>
    </WrapperDashboard>
  )
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceCompanyView));