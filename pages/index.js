import React, { useEffect, useReducer } from 'react';
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

const { Title, Text } = Typography;

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
  const { landing } = state;
  return {
    user: state.user,
    jobsList: landing.jobs,
    driversList: landing.drivers,
    servicesList: landing.services
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query)),
    fetchLandingData: () => dispatch(fetchLandingData()),
  }
}

const HomePage = (props) => {
  const { fetchJobs, fetchLandingData } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchLandingData();
  }, [])

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
        <JobsListComp jobsList={props.jobsList} type='large' />
      </WrapperSection>
      <WrapperSection xs={24} row={18} styles={{ background: "#001628" }} >
        <TitleSection theme='dark' title={drivers.title} subTitle={drivers.subTitle} />
        <Row justify='center' align='middle' gutter={[16, 16]}>
          <DriverList driversList={props.driversList} />
        </Row>
      </WrapperSection>
      <WrapperSection xs={24} row={18}>
        <TitleSection theme='light' title={services.title} subTitle={services.subTitle} />
        <ServicesList servicesList={props.servicesList} />
      </WrapperSection>
    </>
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (HomePage));