import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../../../components/layout';
import WrapperSection from '../../../../components/WrapperSection';
import {
  Row,
  Col,
} from 'antd';
import SideNav from '../../../../components/loading';

const initialState = {
  loading:false,
}

const types = {}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error('Unexpected action');
  }
}

const ServiceCompanyView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {}, []);

  return (
    <MainLayout title='Service' user={user}>
      <Row>
       {
          user.typeUser ? <SideNav typeUser={user.typeUser} /> : null
        }
        <Col span={20}>
          <WrapperSection row={24} mt={0}>
           {state.loading && <LoadingComp/>}
            <p>DEMO VIEW COMPONENT</p>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};


export default ServiceCompanyView;