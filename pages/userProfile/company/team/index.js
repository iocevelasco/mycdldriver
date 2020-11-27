import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  List,
  Avatar,
  Card,
  Typography
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;

const initialState = {
  loading:true,
  jobs: [],
}
const types = {
  TEAM_DATA: 'team_data',
  FETCH_DATA: 'FETCH_DATA',
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
  case types.TEAM_DATA:
    return { ...state, loading: false }
  case types.FETCH_DATA:
    return { ...state, jobs: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const TeamCompanyView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  
  const configSection = {
    title:'Our Drivers',
    user:{user},
    loading:state.loading,
  }

  useEffect(() => {
    dispatch({ type: types.TEAM_DATA });
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {console.log(header);
      const { data } = await axios.get(`/api/company/jobs/staff`, header);
      dispatch({ type: types.FETCH_DATA, payload: data.data });
    } catch (err) {
      console.log(err)
    }
  }

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

  return (
    <MainLayout {...configSection}>
      <Row>
        <SideNav 
         currentLocation='3' /> 
        <Col span={20}>
          <WrapperSection row={18} styles={stylesWrapper}>
            <Card>
              <List
                header={<Title level={4}>Our Staff</Title>}
                itemLayout="horizontal"
                dataSource={state.jobs}
                pagination={{
                  pageSize: 4,
                }}
                renderItem={item => {
                  return <List.Item>
                    <div className='driver-my--job'>{console.log(item)}
                      <Avatar size={80} src={item.photo ? item.photo : ''} />
                      <div className='description'>
                        <div>
                          <Title level={3}> {item.name} {item.lastname} </Title>
                          <div>
                            <Text> Address </Text>
                            <Text strong> {item.driver.address} </Text> <Text strong > | </Text>
                            <Text> Date </Text>
                            <Text strong> {moment(item.driver.date).format('YYYY-MM-DD')} </Text>
                          </div>
                          <div>
                            <Text> Phone </Text>
                            <Text strong> {item.driver.areaCode} - {item.driver.phoneNumber} </Text> <Text strong > | </Text>
                            <Text> Email </Text>
                            <Text strong> {item.email} </Text>
                          </div>
                          <div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                }}
              />
            </Card>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps)(TeamCompanyView));