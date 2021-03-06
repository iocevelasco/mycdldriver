import React, { useEffect, useReducer } from 'react';
import {
  Row,
  Col,
} from 'antd';
import { WrapperSection, WrapperDashboard, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

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
    handlerUserProps: data => {
      dispatch({ type: 'USER_DATA', payload: data });
    },
  }
};



const ServiceDriverView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    props.handlerUserProps(user);
    dispatch({ type: types.TEAM_DATA });
  }, [user]);

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    marginTop: 24,
    marginBottom: 24,
    backgroundSize: 'contain',
  }

  return (
    <WrapperSection style={stylesWrapper} row={24}>
      <BuildSection />
    </WrapperSection>
  )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceDriverView));