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
import { WrapperSection, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;

const initialState = {
  loading: true,
  jobs: [],
}
const types = {
  FETCH_DATA: 'FETCH_DATA',
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_DATA:
      return { ...state, jobs: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const JobsDriverView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const configSection = {
    title: 'Our Drivers',
    user: { user },
    loading: state.loading,
  }

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.post(`/api/company/jobs/myjobs`, {}, header);
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
          currentLocation='1' />
        <Col span={20}>
          <WrapperSection row={18} styles={stylesWrapper}>
            <Card>
              <List
                header={<Title level={4}>Applied jobs</Title>}
                itemLayout="horizontal"
                dataSource={state.jobs}
                renderItem={item => {
                  return <List.Item>
                    <div className='driver-my--job'>
                      <Avatar size={80} src={item.job.logo} />
                      <div className='description'>
                        <div>
                          <Title level={3}> {item.job.title} </Title>
                          <div>
                            <Text> Address </Text>
                            <Text strong> {item.job.city} </Text> <Text strong > | </Text>
                            <Text> Date </Text>
                            <Text strong> {moment(item.job.date).format('YYYY-MM-DD')} </Text>
                          </div>
                          <div>
                            <Text> Phone </Text>
                            <Text strong> {item.job.areaCode} - {item.job.phoneNumber} </Text> <Text strong > | </Text>
                            <Text> Email </Text>
                            <Text strong> {item.job.email} </Text>
                          </div>
                          <Text> {item.job.description} </Text>
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


export default withRouter(connect(mapStateToProps)(JobsDriverView));