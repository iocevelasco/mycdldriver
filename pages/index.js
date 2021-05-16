import React, { useEffect, useReducer, useState } from 'react';
import { Row, Col, Typography, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import CarouselComp from 'components/carousel';
import { WrapperSection } from 'components/helpers';
import { connect } from 'react-redux';
import queryString from "query-string";
import { fetchJobPositionData, fetchLandingData } from '@store/reducers/landing_reducer';
import { logoutUser } from '@store/reducers/user_reducer';
import axios from 'axios';

//mock
import mock_ranking from '../mock/ranking.json';
import "./home/styles.less";
import "./home/styles/index.less";
//View components
import { HeaderLandingComp, JobsListComp, DriverList, TitleSection, ServicesList } from './home/components';

import { drivers, services, jobs } from './home/text.json';

const initialState = {
  sponsors: [],
  search_name: '',
  carousel_data: [],
  query: '',
  ranking: [],
  filter_selected: {}
}

const types = {
  carousel_data: 'carousel_data',
  positions: 'positions',
  FILTER_SELECTED: 'ranking',
  CLEAN_FILTERS: 'clean_filters'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload }
    case types.ranking:
      return { ...state, ranking: action.payload }
    case types.FILTER_SELECTED:
      return {
        ...state,
        filter_selected: action.payload.filters,
        query: action.payload.query
      }
    case types.CLEAN_FILTERS:
      return {
        ...state, query: ''
      }
    default:
      throw new Error('Unexpected action');
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query)),
    fetchLandingData: () => dispatch(fetchLandingData()),
    handleLogout: () => dispatch(logoutUser()),
  }
}

const HomePage = ({
  user,
  fetchJobs,
  fetchDrivers,
  deviceType,
  fetCommons,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [landingData, setData] = useState({ services: [], jobs: [], drivers: [], commont: [] });

  useEffect(() => {
    fetchLandingData();
  }, [])

  function fetchLandingData() {
    function servicesList() {
      return axios.get('/api/services/home');
    }
    function jobsLits() {
      return axios.get('/api/company/jobs');
    }
    function driversList() {
      return axios.get('/api/user/1');
    }
    function fetchCommonData() {
      return axios.get(`/api/company/jobs/customlist`);
    }

    return Promise.all([servicesList(), jobsLits(), driversList(), fetchCommonData()])
      .then(function (results) {
        const services = results[0].data.data;
        const jobs = results[1].data.data;
        const drivers = results[2].data.data;
        const commont = results[3].data.data;
        console.log('results', services, jobs, drivers, commont)
        setData({ jobs, drivers, commont, services })
      })
  }


  const cleanFilter = () => {
    fetchJobs('');
    dispatch({ type: types.CLEAN_FILTERS });
  }
  const handlerSearch = (e, key) => {
    let value = "";
    if (key == 'input') value = e;
    else if (key == 'city') value = e;

    let filters = state.filter_selected;

    filters[key] = value;
    const stringify = queryString.stringify(filters);
    dispatch({
      type: types.FILTER_SELECTED,
      payload: {
        query: stringify,
        filters: filters
      }
    });
  }

  const DeleteUser = async () => {
    const header = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    await axios.delete('/api/user/' + user._id, header)
      .then((response) => props.handleLogout())
      .catch((err) => {
        console.log('err', err)
      })
  }

  const wrapperStyle = {
    marginTop: 16,
    marginBottom: 16
  }

  return (
    <>
      <HeaderLandingComp
        handlerSearch={handlerSearch}
        filter_selected={state.filter_selected}
        cleanFilter={cleanFilter}
        query={state.query}
      />
      <WrapperSection xs={24} row={18}>
        <TitleSection theme='light' title={jobs.title} subTitle={jobs.subTitle} />
        <JobsListComp jobsLits={landingData.jobs} type='large' />
      </WrapperSection>
      <WrapperSection xs={24} row={18} styles={{ background: "#001628" }} >
        <TitleSection theme='dark' title={drivers.title} subTitle={drivers.subTitle} />
        <Row justify='center' align='middle' gutter={[16, 16]}>
          <DriverList rankingDriver={state.ranking} />
        </Row>
      </WrapperSection>
      <WrapperSection xs={24} row={18}>
        <TitleSection theme='light' title={services.title} subTitle={services.subTitle} />
        <ServicesList />
      </WrapperSection>
    </>
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (HomePage));