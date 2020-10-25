import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../../../components/layout';
import WrapperSection from '../../../../components/WrapperSection';
import {
  Row,
  Col,
} from 'antd';
import DrawerComponent from '../../components/SideNavAdmin';

const initialState = {}

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
        <Col span={4}>
          <DrawerComponent />
        </Col>
        <Col span={20}>
          <WrapperSection row={24} mt={0}>
            <p>Service view component</p>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};


export default ServiceCompanyView;