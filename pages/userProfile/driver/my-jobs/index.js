import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  List, 
  Avatar
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection, BuildSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';

const initialState = {
  loading:true,
  jobs: [],
}
const types = {
    FETCH_DATA: 'FETCH_DATA',
}

function mapStateToProps(state){
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
    title:'Our Drivers',
    user:{user},
    loading:state.loading,
  }

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try{
        console.log('[user]', header);
        const { data } = await axios.post(`/api/company/jobs/myjobs`, {}, header);
        console.log('[data]', data.data);
        dispatch({ type: types.FETCH_DATA, payload:data.data});
    }catch(err){
      console.log(err)
    }
  }
  console.log('[ LISTA ]', state.jobs);
  return (
    <MainLayout {...configSection}>
      <Row>
        <SideNav 
         currentLocation='2' /> 
        <Col span={20}>
          <WrapperSection row={24} mt={0}>
          <List
            itemLayout="horizontal"
            dataSource={state.jobs}
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 4,
            }}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.job.logo} />}
                title={<a href="https://ant.design">{item.job.title}</a>}
                description={item.job.description}
                />
            </List.Item>
            )}
        />
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};


export default withRouter(connect(mapStateToProps)(JobsDriverView));