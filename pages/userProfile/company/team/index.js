import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  List,
  Avatar,
  Card,
  Table,
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
  const [loading, setLoadin] = useState(true);
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
      setLoadin(true);
      const { data } = await axios.get(`/api/company/jobs/staff`, header);
      dispatch({ type: types.FETCH_DATA, payload: data.data });
      setLoadin(false);
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render:  url => <Avatar size={80} src={url} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

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
            <Table
                rowKey='id'
                loading={loading}
                columns={columns}
                expandable={{
                  expandedRowRender: record => {
                    return <List
                      header={<Title level={4}>Positions</Title>}
                      itemLayout="horizontal"
                      bordered
                      dataSource={record.jobs}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar src={item.logo} />
                            }
                            title={<p>{`${item.title}`} </p>}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  }
                }}
                dataSource={state.jobs}
              />
            </Card>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps)(TeamCompanyView));