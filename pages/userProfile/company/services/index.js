import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

function mapStateToProps(state){
  return {
      user: state.user
  }
}

const initialState = {
  loading:true,
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

const ServiceCompanyView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const configSection = {
    title:'Services',
    user:{user},
    loading:state.loading,
  }

  useEffect(() => {
    dispatch({ type: types.TEAM_DATA });
  }, [user]);

  return (
    <MainLayout {...configSection}>
      <Row>
       <SideNav currentLocation='3' /> 
        <Col span={20}>
          <WrapperSection row={24} mt={0}>
              <BuildSection section='Services' />
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps)(ServiceCompanyView));